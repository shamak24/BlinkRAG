import chromadb
from sentence_transformers import SentenceTransformer
from .models import DocumentChunk

model = SentenceTransformer("all-MiniLM-L6-v2")
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="document_chunks")

def search_relevant_chunks(question, doc_id, top_k=3):
    question_embedding = model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=top_k,
        include=["documents"]  # ✅ Fixed: Removed 'ids'
    )

    documents = results.get("documents", [[]])[0]
    return documents
