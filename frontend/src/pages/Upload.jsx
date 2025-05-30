import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a .txt file to upload.");
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    if (title) formData.append("title", title);

    try {
      const response = await axios.post("http://localhost:8000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setStatus(`Uploaded successfully: ${response.data.title}`);
      setFile(null);
      setTitle("");
    } catch (error) {
      console.error(error);
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload Document</h1>

      <input
        type="text"
        placeholder="Optional title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4"
      />

      <input
        type="file"
        accept=".txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </div>
  );
};

export default Upload;
