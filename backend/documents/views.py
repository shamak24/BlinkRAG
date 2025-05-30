
# Create your views here.
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Document
from .serializers import DocumentUploadSerializer
import os
from .embedding_utils import process_document
from .serializers import QuestionAnswerSerializer
from .vector_store import search_relevant_chunks
from .gemini_llm import generate_answer_with_gemini
from rest_framework.generics import DestroyAPIView

class DocumentUploadView(APIView):
    def post(self, request):
        file = request.FILES.get('file')
        title = request.data.get('title', file.name if file else None)

        if not file:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        file_type = os.path.splitext(file.name)[-1][1:]  # 'txt', 'pdf', etc.
        size = file.size

        document = Document.objects.create(
            title=title,
            file=file,
            file_type=file_type,
            size=size,
            processing_status="pending"
        )

        # Process it if it's a TXT file
        if file_type == "txt":
            process_document(document)

        serializer = DocumentUploadSerializer(document)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AskQuestionView(APIView):
    def post(self, request):
        serializer = QuestionAnswerSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        doc_id = serializer.validated_data["document_id"]
        question = serializer.validated_data["question"]
        top_k = serializer.validated_data["top_k"]

        try:
            document = Document.objects.get(id=doc_id)
        except Document.DoesNotExist:
            return Response({"error": "Document not found"}, status=404)

        # Get relevant chunks
        relevant_chunks = search_relevant_chunks(question, doc_id, top_k)
        context = "\n\n".join(relevant_chunks)

        # Get LLM response
        answer = generate_answer_with_gemini(question, context)

        return Response({"answer": answer})
    
class DocumentListView(ListAPIView):
    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentUploadSerializer

class DocumentDeleteView(DestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentUploadSerializer

    def perform_destroy(self, instance):
        # Delete file from disk
        if instance.file:
            instance.file.delete(save=False)
        instance.delete()