import chromadb
from sentence_transformers import SentenceTransformer
from .models import DocumentChunk

model = SentenceTransformer("all-MiniLM-L6-v2")
chroma_client = chromadb.PersistentClient(path="chromadb_storage")
collection = chroma_client.get_or_create_collection(name="document_chunks")

def search_relevant_chunks(question, doc_id, top_k=3):
    question_embedding = model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=top_k,
        where={"document_id": str(doc_id)},
        include=["documents"]
    )
    print("====CHROMA RESULTS====")
    print(results)


    documents = results.get("documents", [[]])[0]
    return documents
