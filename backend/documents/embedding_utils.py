import os
from .models import Document, DocumentChunk
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.utils import embedding_functions

# Load the sentence transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Create or connect to ChromaDB collection
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="document_chunks")

def process_document(document: Document):
    """
    Reads a TXT file, splits it into chunks, generates embeddings,
    stores chunks in DB and ChromaDB.
    """
    file_path = document.file.path

    # Read the TXT content
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simple paragraph-based chunking
    chunks = [chunk.strip() for chunk in content.split("\n\n") if chunk.strip()]

    for idx, chunk_text in enumerate(chunks):
        # Generate embedding
        embedding = model.encode(chunk_text).tolist()

        # Save chunk to DB
        doc_chunk = DocumentChunk.objects.create(
            document=document,
            chunk_index=idx,
            chunk_text=chunk_text,
            page_number=None,  # You can leave this for now
        )

        # Save to ChromaDB
        collection.add(
            documents=[chunk_text],
            embeddings=[embedding],
            ids=[f"{document.id}_{idx}"],
            metadatas=[{"document_id": str(document.id)}]
        )

        # Save embedding ID (optional)
        doc_chunk.embedding_id = f"{document.id}_{idx}"
        doc_chunk.save()

    # Mark document as processed
    document.processing_status = "processed"
    document.save()
