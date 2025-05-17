import { useState } from "react";
import { FiLink } from "react-icons/fi";
import LinkForm from "../components/LinkForm";
import { Link } from "react-router-dom";

function HomePage() {
  const [recentlyCreated, setRecentlyCreated] = useState(null);

  const handleSuccess = (newLink) => {
    setRecentlyCreated(newLink);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Create <span className="text-blue-600">Custom Links</span> With Your
          Own Names
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Simplify your links with fully customizable short URLs. No prefixes or
          suffixes - just the name you choose.
        </p>
      </div>

      <LinkForm onSuccess={handleSuccess} />

      {recentlyCreated && (
        <div className="mt-8 card border border-green-100 bg-green-50 animate-fade-in">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FiLink className="text-green-600" />
            </div>
            <h3 className="font-semibold text-xl text-gray-800">
              URL Created Successfully!
            </h3>
          </div>

          <div className="p-4 bg-white rounded-lg mb-4 border border-gray-100">
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Original URL:</p>
              <p className="text-gray-700 break-all">
                {recentlyCreated.originalUrl}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Your shortened URL:</p>
              <p className="text-blue-600 font-medium break-all">
                <a
                  href={`${window.location.origin}/${recentlyCreated.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {window.location.origin}/{recentlyCreated.shortUrl}
                </a>
              </p>
            </div>
          </div>

          <div className="flex space-x-3 justify-end">
            <button
              onClick={() => setRecentlyCreated(null)}
              className="btn-secondary"
            >
              Create Another
            </button>
            <Link to="/links" className="btn-primary">
              View All Links
            </Link>
          </div>
        </div>
      )}

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FiLink className="text-blue-600" />
            </div>
            <h3 className="font-semibold">Custom Names</h3>
          </div>
          <p className="text-gray-600">
            Choose your own memorable names for your links instead of random
            characters.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-semibold">Secure & Reliable</h3>
          </div>
          <p className="text-gray-600">
            All links are securely stored and available whenever you need them.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold">Track Clicks</h3>
          </div>
          <p className="text-gray-600">
            See how many times your shortened links have been clicked.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
