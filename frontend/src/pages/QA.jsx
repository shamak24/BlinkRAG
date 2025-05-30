import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QA = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    // Add the user's question to the conversation
    setConversation((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/ask/", {
        document_id: parseInt(id),
        question,
        top_k: 3,
      });

      const botAnswer = response.data.answer;
      setConversation((prev) => [...prev, { role: "bot", text: botAnswer }]);
    } catch (error) {
      console.error(error);
      setConversation((prev) => [
        ...prev,
        { role: "bot", text: "Error fetching answer. Try again." },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>

      <div className="space-y-4 mb-4">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <textarea
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border p-2 rounded mb-4 min-h-[80px]"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
    </div>
  );
};

export default QA;
