// Developer.js
import React from 'react';

function Developer() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                {/* Developer Details */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">About the Developer</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Hi, I'm <span style={{ color: "#6c63ff" }}>Venkatesh M</span>, the developer behind this platform. I'm passionate about creating innovative solutions.
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        Feel free to explore my work and connect with me through the portfolio link below.
                    </p>

                    {/* Portfolio Link */}
                    <div className="mt-6">
                        <a
                            href="https://myportfolio-three-kappa-32.vercel.app/" // Replace with your actual portfolio URL
                            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit My Portfolio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Developer;
