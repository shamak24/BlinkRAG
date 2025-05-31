# ✨ **BlinkRAG – Document Intelligence RAG App**

> - 🧠 **BlinkRAG** is a full-stack app to upload documents, chunk & embed them into a vector DB, and ask natural language questions – answered in real-time by Gemini 2.0 AI.
> - 💻 **Tech:** Django, Gemini 2.0, Vite + React, Tailwind CSS.
> - ✨ **Style:** Clean. Minimal UI

---

## 🚀 **Features**

- ✅ Upload `.txt` files
- ✅ Auto-chunk & embed with **Sentence Transformers**
- ✅ **ChromaDB** for fast semantic search
- ✅ Gemini 2.0 Flash answers 🔥
- ✅ Chat-like Q\&A interface
- ✅ Responsive design – looks fab on mobile too! 📱

---

## 🛠️ **Tech Stack**

<p align="center">
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

---

## 📂 **Project Structure**

```
BlinkRAG/
├── backend/       # Django backend
├── frontend/      # Vite + React frontend
└── README.md
```

---

## 🌐 **API Endpoints**

| Endpoint          | Method | Description               |
| ----------------- | ------ | ------------------------- |
| `/api/upload/`    | POST   | Upload document           |
| `/api/documents/` | GET    | List uploaded docs        |
| `/api/ask/`       | POST   | Ask question to Gemini 🤖 |

---

## ⚙️ **Getting Started**

### **Clone Repo**
```bash
git clone https://github.com/shamak24/BlinkRAG.git
```

### 🔧 **Backend**

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 🖥️ **Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 **Setup Tips**

- ✅ **CORS**: Set `CORS_ALLOW_ALL_ORIGINS=True` in Django
- ✅ **API Key**: Add your `GEMINI_API_KEY` in `.env`

---

## 💡 **Why BlinkRAG?**

- Because Gen Z wants answers fast ⚡.
- Because your doc insights shouldn’t gather dust 📚.
- Because AI is better when it’s conversational. 🎤

---
<p align="center">Made with ❤️ by Soumil Shamak 😎</p>
