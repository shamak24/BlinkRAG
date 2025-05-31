import chromadb
from sentence_transformers import SentenceTransformer
from .models import DocumentChunk

# Load the pre-trained sentence transformer model for embedding text
model = SentenceTransformer("all-MiniLM-L6-v2")

# Initialize a persistent ChromaDB client, storing data in 'chromadb_storage'
chroma_client = chromadb.PersistentClient(path="chromadb_storage")

# Get or create a collection named 'document_chunks' for storing document embeddings
collection = chroma_client.get_or_create_collection(name="document_chunks")

def search_relevant_chunks(question, doc_id, top_k=3):
    """
    Search for the top_k most relevant document chunks for a given question and document ID.

    Args:
        question (str): The input question to search for relevant chunks.
        doc_id (str or int): The ID of the document to filter chunks.
        top_k (int): Number of top relevant chunks to return.

    Returns:
        list: List of relevant document chunks.
    """
    # Encode the question into an embedding vector
    question_embedding = model.encode(question).tolist()

    # Query the collection for the most similar document chunks
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=top_k,
        where={"document_id": str(doc_id)},  # Filter by document ID
        include=["documents"]  # Include the actual document chunks in the results
    )
    print("====CHROMA RESULTS====")
    print(results)

    # Extract the list of documents from the results
    documents = results.get("documents", [[]])[0]
    return documents
