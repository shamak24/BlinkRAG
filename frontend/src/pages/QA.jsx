import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QA = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleAsk = async () => {
    if (!question.trim()) return;

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
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto mt-20 bg-white rounded shadow py-12 px-4 pt-24">
      <h1 className="text-2xl font-bold p-4 border-b">Ask a Question 🤔⁉️</h1>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "bot" && (
              <div className="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-2">
                🤖
              </div>
            )}
            <div
              className={`max-w-xs p-3 rounded-lg shadow ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 bg-green-200 rounded-full flex items-center justify-center ml-2">
                🧑
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t bg-white flex gap-2">
        <textarea
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border rounded p-2 resize-none min-h-[40px] max-h-[100px] focus:outline-blue-400"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAsk();
            }
          }}
          disabled={loading}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default QA;
