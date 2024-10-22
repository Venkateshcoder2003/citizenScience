import React from 'react';

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                        Welcome to Citizen Science Platform
                    </h1>
                    <p className="mt-3 text-xl text-gray-600 sm:mt-4">
                        Contribute to scientific research from your home!
                    </p>
                    <p className="mt-3 text-xl text-gray-600 sm:mt-4">
                        This website contributes to:
                        <ul className="list-disc list-inside mt-3 text-left">
                            <li>People making research or projects in any domain.</li>
                            <li>Researchers can update their project details by registering as scientists.</li>
                            <li>Interested citizens can contribute to these projects.</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
