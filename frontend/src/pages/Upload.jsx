import { useState, useRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import axios from "axios";

// Upload component for uploading .txt documents
const Upload = () => {
  // State for selected file, optional title, status message, and upload progress
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  // Handle file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Prevent default drag over behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle file upload to backend
  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a .txt file to upload.");
      return;
    }
    setIsUploading(true);
    setStatus("");
    const formData = new FormData();
    formData.append("file", file);
    if (title) formData.append("title", title);

    try {
      // Send POST request to upload endpoint
      const response = await axios.post("http://localhost:8000/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(`Uploaded successfully: ${response.data.title}`);
      setFile(null);
      setTitle("");
    } catch (error) {
      setStatus("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">Upload Document 📃</h1>
        {/* Drag & drop area for file selection */}
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 mb-6 transition-colors ${
            file ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-50 hover:border-indigo-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
          style={{ cursor: "pointer" }}
        >
          <CloudArrowUpIcon className="h-12 w-12 text-indigo-400 mb-2" />
          <p className="text-gray-700 mb-1">
            {file ? (
              <span className="font-semibold text-indigo-700">{file.name}</span>
            ) : (
              "Drag & drop your .txt file here, or click to select"
            )}
          </p>
          {/* Hidden file input for manual selection */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {/* Optional title input */}
        <input
          type="text"
          placeholder="Optional title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
        {/* Status message */}
        {status && (
          <div
            className={`mt-5 text-center px-4 py-2 rounded-lg ${
              status.startsWith("Uploaded")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
