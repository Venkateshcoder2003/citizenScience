// // Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//     const [isOpen, setIsOpen] = React.useState(false);

//     return (
//         <nav className="bg-gray-800 text-white">
//             <div className="max-w-6xl mx-auto px-4">
//                 <div className="flex justify-between items-center h-16">
//                     {/* Logo */}
//                     <div className="flex-shrink-0">
//                         <Link to="/" className="text-xl font-bold">CitizenScience</Link>
//                     </div>

//                     {/* Desktop Menu */}
//                     <div className="hidden md:block">
//                         <div className="ml-10 flex items-baseline space-x-4">
//                             <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
//                             <Link to="/projects" className="hover:bg-gray-700 px-3 py-2 rounded-md">Projects</Link>
//                             <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
//                             <Link to="/register" className="hover:bg-gray-700 px-3 py-2 rounded-md">Register</Link>
//                         </div>
//                     </div>

//                     {/* Mobile menu button */}
//                     <div className="md:hidden">
//                         <button
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
//                         >
//                             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 {isOpen ? (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 ) : (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                                 )}
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {isOpen && (
//                     <div className="md:hidden">
//                         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                             <Link to="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
//                             <Link to="/projects" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Projects</Link>
//                             <Link to="/login" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
//                             <Link to="/register" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Register</Link>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// }

// export default Navbar;

// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold">CitizenScience</Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
                            <Link to="/projects" className="hover:bg-gray-700 px-3 py-2 rounded-md">Projects</Link>
                            <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
                            <Link to="/register" className="hover:bg-gray-700 px-3 py-2 rounded-md">Register</Link>
                            {/* Developer Link */}
                            <Link to="/developer" className="hover:bg-gray-700 px-3 py-2 rounded-md">Developer</Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
                            <Link to="/projects" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Projects</Link>
                            <Link to="/login" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
                            <Link to="/register" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Register</Link>
                            {/* Developer Link for Mobile */}
                            <Link to="/developer" className="block hover:bg-gray-700 px-3 py-2 rounded-md">Developer</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
