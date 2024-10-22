// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function CitizenDashboard() {
//     const [projects, setProjects] = useState([]);
//     const [selectedProject, setSelectedProject] = useState(null);
//     const [pdfFile, setPdfFile] = useState(null);

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     const fetchProjects = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/projects', {
//                 headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//             });
//             setProjects(response.data.filter((project) => project.creator.role === 'citizen'));
//         } catch (error) {
//             console.error('Failed to fetch projects:', error);
//             toast.error('Failed to fetch projects');
//         }
//     };

//     const handleProjectSelect = (project) => {
//         setSelectedProject(project);
//     };

//     const handleFileChange = (e) => {
//         setPdfFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedProject || !pdfFile) {
//             toast.error('Please select a project and a PDF file');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdf', pdfFile);
//         formData.append('projectId', selectedProject._id);

//         try {
//             await axios.post('http://localhost:5000/api/projects/submit', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             toast.success('PDF submitted successfully');
//             setPdfFile(null);
//             setSelectedProject(null);
//         } catch (error) {
//             console.error('Failed to submit PDF:', error);
//             toast.error('Failed to submit PDF');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Citizen Dashboard</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2">Available Projects</h2>
//                     {projects.map(project => (
//                         <div
//                             key={project._id}
//                             className={`p-2 border rounded mb-2 cursor-pointer ${selectedProject?._id === project._id ? 'bg-blue-100' : ''}`}
//                             onClick={() => handleProjectSelect(project)}
//                         >
//                             {project.title}
//                         </div>
//                     ))}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2">Submit Data</h2>
//                     {selectedProject ? (
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <label className="block mb-2">Selected Project: {selectedProject.title}</label>
//                                 <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-2" />
//                                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit PDF</button>
//                             </div>
//                         </form>
//                     ) : (
//                         <p>Please select a project to submit data.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CitizenDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CitizenDashboard() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/projects', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            toast.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setPdfFile(null); // Reset file selection when changing projects
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== 'application/pdf') {
            toast.error('Please select a PDF file');
            e.target.value = null;
            return;
        }
        setPdfFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProject || !pdfFile) {
            toast.error('Please select a project and a PDF file');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('projectId', selectedProject._id);

        setSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/projects/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('PDF submitted successfully');
            setPdfFile(null);
            setSelectedProject(null);
            fetchProjects(); // Refresh projects list
        } catch (error) {
            console.error('Failed to submit PDF:', error);
            toast.error(error.response?.data?.error || 'Failed to submit PDF');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Citizen Dashboard</h1>

            {loading ? (
                <p className="text-gray-500">Loading projects...</p>
            ) : (
                <div className="space-y-6">
                    {/* Projects List */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Available Projects</h2>
                        {projects.length === 0 ? (
                            <p className="text-gray-500">No projects available.</p>
                        ) : (
                            <div className="space-y-4">
                                {projects.map(project => (
                                    <div
                                        key={project._id}
                                        className={`border rounded-lg p-4 cursor-pointer transition duration-200 
                                                  ${selectedProject?._id === project._id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'hover:border-blue-300'}`}
                                        onClick={() => handleProjectSelect(project)}
                                    >
                                        <h3 className="text-lg font-medium text-blue-600">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            {project.description}
                                        </p>
                                        <div className="mt-2 text-sm text-gray-500">
                                            Created by: {project.creator.username}
                                        </div>

                                        {/* Show user's submissions for this project */}
                                        <div className="mt-3">
                                            <h4 className="font-medium text-gray-700">
                                                Your Submissions
                                            </h4>
                                            {project.submissions
                                                .filter(sub => sub.user.username ===
                                                    localStorage.getItem('username'))
                                                .map((submission, index) => (
                                                    <div
                                                        key={submission._id}
                                                        className="mt-2 text-sm text-gray-600"
                                                    >
                                                        Submission {index + 1} -
                                                        {new Date(submission.submittedAt)
                                                            .toLocaleDateString()}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* PDF Upload Section */}
                    {selectedProject && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Submit PDF for {selectedProject.title}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select PDF File
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 
                                                 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting || !pdfFile}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md 
                                             hover:bg-blue-700 disabled:bg-blue-300 
                                             transition duration-200"
                                >
                                    {submitting ? 'Submitting...' : 'Submit PDF'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CitizenDashboard;