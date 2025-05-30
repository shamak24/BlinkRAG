from django.db import models

# Document model
class Document(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents/')
    file_type = models.CharField(max_length=20)  # e.g., 'txt', 'pdf'
    size = models.IntegerField()  # in bytes
    page_count = models.IntegerField(null=True, blank=True)  # Optional, esp. for PDF
    processing_status = models.CharField(max_length=20, default='pending')  # pending, processed, failed
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Chunk model
class DocumentChunk(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='chunks')
    chunk_index = models.IntegerField()
    chunk_text = models.TextField()
    page_number = models.IntegerField(null=True, blank=True)  # Optional
    embedding_id = models.CharField(max_length=100, null=True, blank=True)  # ChromaDB ID or vector reference

    def __str__(self):
        return f"{self.document.title} - Chunk {self.chunk_index}"
