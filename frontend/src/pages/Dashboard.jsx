import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/documents/");
        setDocuments(response.data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Document Dashboard</h1>

      {loading ? (
        <p>Loading documents...</p>
      ) : documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Type</th>
                <th className="p-2">Size (KB)</th>
                <th className="p-2">Status</th>
                <th className="p-2">Uploaded</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-t">
                  <td className="p-2">{doc.title}</td>
                  <td className="p-2">{doc.file_type}</td>
                  <td className="p-2">{(doc.size / 1024).toFixed(1)}</td>
                  <td className="p-2 capitalize">{doc.processing_status}</td>
                  <td className="p-2">{new Date(doc.created_at).toLocaleDateString()}</td>
                  <td className="p-2">
                    <Link to={`/ask/${doc.id}`} className="text-blue-600 hover:underline">
                      Ask
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;