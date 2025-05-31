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
    """
    Handles uploading of documents.
    """
    def post(self, request):
        file = request.FILES.get('file')
        title = request.data.get('title', file.name if file else None)

        if not file:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        file_type = os.path.splitext(file.name)[-1][1:]  # Extract file extension (e.g., 'txt', 'pdf')
        size = file.size

        # Create a new Document instance in the database
        document = Document.objects.create(
            title=title,
            file=file,
            file_type=file_type,
            size=size,
            processing_status="pending"
        )

        # If the uploaded file is a TXT file, process it for embeddings
        if file_type == "txt":
            process_document(document)

        serializer = DocumentUploadSerializer(document)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AskQuestionView(APIView):
    """
    Handles question answering for a specific document.
    """
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

        # Retrieve relevant chunks from the vector store
        relevant_chunks = search_relevant_chunks(question, doc_id, top_k)
        context = "\n\n".join(relevant_chunks)

        # Generate answer using the LLM (Gemini)
        answer = generate_answer_with_gemini(question, context)

        return Response({"answer": answer})
    
class DocumentListView(ListAPIView):
    """
    Lists all documents, ordered by creation date (most recent first).
    """
    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentUploadSerializer

class DocumentDeleteView(DestroyAPIView):
    """
    Handles deletion of a document and its associated file.
    """
    queryset = Document.objects.all()
    serializer_class = DocumentUploadSerializer

    def perform_destroy(self, instance):
        # Delete file from disk if it exists
        if instance.file:
            instance.file.delete(save=False)
        instance.delete()