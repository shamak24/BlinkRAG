from rest_framework import serializers
from .models import Document

class DocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title', 'file', 'file_type', 'size', 'page_count', 'processing_status', 'created_at']
        read_only_fields = ['id', 'size', 'page_count', 'processing_status', 'created_at']

class QuestionAnswerSerializer(serializers.Serializer):
    document_id = serializers.IntegerField()
    question = serializers.CharField()
    top_k = serializers.IntegerField(required=False, default=3)  # number of chunks