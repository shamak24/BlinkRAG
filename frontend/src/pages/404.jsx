import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
            <div className="bg-white shadow-lg rounded-lg p-10 flex flex-col items-center">
                <svg
                    className="w-20 h-20 text-blue-500 mb-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zm-6 4.5a6 6 0 0 1 12 0"
                    />
                </svg>
                <h1 className="text-5xl font-extrabold text-blue-600 mb-2">404</h1>
                <p className="text-lg text-gray-700 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
                <div className="flex flex-col items-center space-y-4">
                    <Link
                        to="/"
                        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}

