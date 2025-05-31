import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// List of dashboard features to display
const features = [
  {
    title: "Ask Questions",
    description: "Upload TXT file (for now) and interact with your documents using natural language queries.",
    icon: "❓",
  },
  {
    title: "Fast Processing",
    description: "Documents are processed quickly so you can get answers in seconds.",
    icon: "⚡",
  },
  {
    title: "Secure Storage",
    description: "Your documents are stored securely and privately.",
    icon: "🔒",
  },
];

const Dashboard = () => {
  // State to hold fetched documents
  const [documents, setDocuments] = useState([]);
  // State to manage loading indicator
  const [loading, setLoading] = useState(true);

  // Fetch documents from backend API on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/documents/");
        setDocuments(response.data); // Update state with fetched documents
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 pt-24 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1 w-full">
        {/* Header section with title and upload button */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight flex items-center gap-2">
            <span role="img" aria-label="books">📚</span>
            Document Dashboard
          </h1>
          <Link
            to="/upload"
            className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition-colors font-semibold"
          >
            + Upload Document
          </Link>
        </div>

        {/* Main content area: document list or loading/empty state */}
        <div className="bg-white/80 rounded-2xl shadow-xl p-8">
          {loading ? (
            // Loading spinner
            <div className="flex justify-center items-center h-40">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></span>
              <span className="ml-4 text-blue-700 font-medium">Loading documents...</span>
            </div>
          ) : documents.length === 0 ? (
            // Empty state if no documents
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">No documents uploaded yet.</p>
              <Link
                to="/upload"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Upload your first document
              </Link>
            </div>
          ) : (
            // Render list of uploaded documents
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-gradient-to-br from-blue-100 via-white to-blue-200 border border-blue-200 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform"
                >
                  <div>
                    {/* Document title */}
                    <h2 className="text-xl font-bold text-blue-800 mb-2 truncate">{doc.title}</h2>
                    {/* Document metadata badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        {doc.file_type}
                      </span>
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                        {(doc.size / 1024).toFixed(1)} KB
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        doc.processing_status === "completed"
                          ? "bg-green-200 text-green-800"
                          : doc.processing_status === "processing"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}>
                        {doc.processing_status}
                      </span>
                    </div>
                    {/* Upload date */}
                    <p className="text-sm text-gray-500 mb-4">
                      Uploaded: {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {/* Link to ask questions about the document */}
                  <Link
                    to={`/ask/${doc.id}`}
                    className="mt-2 block w-full text-center bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow"
                  >
                    Ask a Question
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-6 bg-transparent">
        <div className="text-center text-gray-600 font-medium text-lg">
          Made with <span role="img" aria-label="love">💖</span> by Soumil Shamak <span role="img" aria-label="cool">😎</span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
