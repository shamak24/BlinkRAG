from rest_framework import serializers
from .models import Document

# Serializer for uploading and displaying Document model instances
class DocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        # Fields to be included in the serialized output
        fields = ['id', 'title', 'file', 'file_type', 'size', 'page_count', 'processing_status', 'created_at']
        # Fields that are read-only and cannot be set by the user
        read_only_fields = ['id', 'size', 'page_count', 'processing_status', 'created_at']

# Serializer for handling question-answer requests related to a document
class QuestionAnswerSerializer(serializers.Serializer):
    document_id = serializers.IntegerField()  # ID of the document to query
    question = serializers.CharField()        # The question to ask about the document
    top_k = serializers.IntegerField(required=False, default=3)  # Number of top chunks to consider (optional)