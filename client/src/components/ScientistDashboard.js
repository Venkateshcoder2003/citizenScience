import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ScientistDashboard() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('https://citizenscienceapp.onrender.com/api/projects', {
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

    const handleInputChange = (e) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://citizenscienceapp.onrender.com/api/projects', newProject, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success('Project created successfully');
            setNewProject({ title: '', description: '' });
            fetchProjects();
        } catch (error) {
            console.error('Failed to create project:', error);
            toast.error(error.response?.data?.error || 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    const handleViewPDF = async (submissionId) => {
        try {
            setLoading(true);

            // Add authorization header
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login again');
                return;
            }

            const response = await axios.get(
                `https://citizenscienceapp.onrender.com/api/projects/submissions/${submissionId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/pdf'
                    },
                    responseType: 'blob'
                }
            );

            // Check if the response is actually a PDF
            const contentType = response.headers['content-type'];
            if (!contentType || !contentType.includes('pdf')) {
                throw new Error('Invalid response format');
            }

            // Create blob URL
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = window.URL.createObjectURL(file);

            // Open in new window
            const newWindow = window.open(fileURL, '_blank');

            // Clean up the blob URL after the window loads
            if (newWindow) {
                newWindow.onload = () => {
                    URL.revokeObjectURL(fileURL);
                };
            } else {
                // If popup was blocked, create a download link
                const link = document.createElement('a');
                link.href = fileURL;
                link.download = `submission-${submissionId}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(fileURL);
            }
        } catch (error) {
            console.error('Failed to fetch submission:', error);

            // More specific error messages
            if (error.response) {
                switch (error.response.status) {
                    case 403:
                        toast.error('You do not have permission to view this submission');
                        break;
                    case 404:
                        toast.error('Submission not found');
                        break;
                    default:
                        toast.error('Failed to fetch PDF');
                }
            } else {
                toast.error('Network error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Scientist Dashboard</h1>

            {/* Create Project Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={newProject.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Description
                        </label>
                        <textarea
                            name="description"
                            value={newProject.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md h-32 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                                 disabled:bg-blue-300 transition duration-200"
                    >
                        {loading ? 'Creating...' : 'Create Project'}
                    </button>
                </form>
            </div>

            {/* Projects List Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
                {loading ? (
                    <p className="text-gray-500">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p className="text-gray-500">No projects created yet.</p>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project._id} className="border rounded-lg p-4">
                                <h3 className="text-lg font-medium text-blue-600">{project.title}</h3>
                                <p className="text-gray-600 mt-1">{project.description}</p>

                                {/* Submissions Section */}
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-700">
                                        Submissions ({project.submissions.length})
                                    </h4>
                                    {project.submissions.length > 0 ? (
                                        <div className="mt-2 space-y-2">
                                            {project.submissions.map((submission, index) => (
                                                <div
                                                    key={submission._id}
                                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                                                >
                                                    <div>
                                                        <span className="text-sm text-gray-600">
                                                            Submission {index + 1} by {submission.user.username}
                                                        </span>
                                                        {submission.submittedAt && (
                                                            <span className="text-xs text-gray-500 ml-2">
                                                                ({new Date(submission.submittedAt).toLocaleDateString()})
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => handleViewPDF(submission._id)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded-md 
                                                                 hover:bg-blue-600 text-sm transition duration-200"
                                                    >
                                                        View PDF
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 mt-2">
                                            No submissions yet.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScientistDashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function ScientistDashboard() {
//     const [projects, setProjects] = useState([]);
//     const [newProject, setNewProject] = useState({ title: '', description: '' });
//     const [loading, setLoading] = useState(true);
//     const [userInfo, setUserInfo] = useState(null);
//     const [submitLoading, setSubmitLoading] = useState(false);

//     useEffect(() => {
//         getUserInfo();
//         fetchProjects();
//     }, []);

//     const getUserInfo = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:5000/api/users/me', {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             console.log('User Info:', response.data);
//             setUserInfo(response.data);
//         } catch (error) {
//             console.error('Failed to fetch user info:', error);
//             toast.error('Failed to fetch user information');
//         }
//     };

//     const fetchProjects = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('Please login to continue');
//                 return;
//             }

//             const response = await axios.get('http://localhost:5000/api/projects', {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             console.log('Projects fetched:', response.data);
//             setProjects(response.data);
//         } catch (error) {
//             console.error('Failed to fetch projects:', error);
//             toast.error('Failed to fetch projects');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         setNewProject({ ...newProject, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('Please login to continue');
//                 return;
//             }

//             const response = await axios.post(
//                 'http://localhost:5000/api/projects',
//                 newProject,
//                 {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }
//             );

//             console.log('Project created:', response.data);
//             toast.success('Project created successfully');
//             setNewProject({ title: '', description: '' });
//             fetchProjects();
//         } catch (error) {
//             console.error('Failed to create project:', error);
//             toast.error(error.response?.data?.error || 'Failed to create project');
//         } finally {
//             setSubmitLoading(false);
//         }
//     };

//     const handleViewPDF = async (submissionId, projectId) => {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('Please login to continue');
//                 return;
//             }

//             console.log('Viewing PDF:', { submissionId, projectId });

//             const response = await axios.get(
//                 `http://localhost:5000/api/projects/submissions/${submissionId}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Accept': 'application/pdf'
//                     },
//                     responseType: 'blob'
//                 }
//             );

//             // Create blob URL
//             const file = new Blob([response.data], {
//                 type: response.headers['content-type'] || 'application/pdf'
//             });
//             const fileURL = window.URL.createObjectURL(file);

//             // Open in new window
//             const newWindow = window.open(fileURL, '_blank');

//             if (newWindow) {
//                 newWindow.onload = () => {
//                     URL.revokeObjectURL(fileURL);
//                 };
//             } else {
//                 // Fallback if popup is blocked
//                 const link = document.createElement('a');
//                 link.href = fileURL;
//                 link.download = `submission-${submissionId}.pdf`;
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//                 URL.revokeObjectURL(fileURL);
//             }
//         } catch (error) {
//             console.error('View PDF error:', error);
//             if (error.response) {
//                 switch (error.response.status) {
//                     case 403:
//                         toast.error(error.response.data.error || 'You do not have permission to view this submission');
//                         break;
//                     case 404:
//                         toast.error('Submission not found');
//                         break;
//                     default:
//                         toast.error(`Error: ${error.response.data.error || 'Failed to fetch PDF'}`);
//                 }
//             } else {
//                 toast.error('Network error occurred');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading && !projects.length) {
//         return (
//             <div className="container mx-auto p-4">
//                 <div className="text-center text-gray-600">Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-4">
//             {/* User Info Section */}
//             {userInfo && (
//                 <div className="bg-blue-50 p-4 rounded-lg mb-6">
//                     <p className="text-blue-800">
//                         Logged in as: <span className="font-semibold">{userInfo.username}</span>
//                         <span className="ml-2 px-2 py-1 bg-blue-100 rounded-full text-sm">
//                             {userInfo.role}
//                         </span>
//                     </p>
//                 </div>
//             )}

//             {/* Create Project Section */}
//             <div className="bg-white rounded-lg shadow p-6 mb-6">
//                 <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Project Title
//                         </label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={newProject.title}
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Project Description
//                         </label>
//                         <textarea
//                             name="description"
//                             value={newProject.description}
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded-md h-32 focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         disabled={submitLoading}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700
//                                  disabled:bg-blue-300 transition duration-200"
//                     >
//                         {submitLoading ? 'Creating...' : 'Create Project'}
//                     </button>
//                 </form>
//             </div>

//             {/* Projects List Section */}
//             <div className="bg-white rounded-lg shadow p-6">
//                 <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
//                 {projects.length === 0 ? (
//                     <p className="text-gray-500 text-center py-4">No projects created yet.</p>
//                 ) : (
//                     <div className="space-y-6">
//                         {projects.map((project) => (
//                             <div key={project._id} className="border rounded-lg p-4">
//                                 <div className="flex justify-between items-start mb-2">
//                                     <h3 className="text-lg font-medium text-blue-600">
//                                         {project.title}
//                                     </h3>
//                                     <span className="text-sm text-gray-500">
//                                         Created by: {project.creator.username}
//                                     </span>
//                                 </div>
//                                 <p className="text-gray-600 mb-4">{project.description}</p>

//                                 {/* Submissions Section */}
//                                 <div className="mt-4">
//                                     <h4 className="font-medium text-gray-700 mb-2">
//                                         Submissions ({project.submissions?.length || 0})
//                                     </h4>
//                                     {project.submissions?.length > 0 ? (
//                                         <div className="space-y-2">
//                                             {project.submissions.map((submission, index) => (
//                                                 <div
//                                                     key={submission._id}
//                                                     className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
//                                                 >
//                                                     <div>
//                                                         <span className="text-sm text-gray-600">
//                                                             Submission {index + 1} by {submission.user.username}
//                                                         </span>
//                                                         {submission.submittedAt && (
//                                                             <span className="text-xs text-gray-500 ml-2">
//                                                                 ({new Date(submission.submittedAt).toLocaleDateString()})
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                     <button
//                                                         onClick={() => handleViewPDF(submission._id, project._id)}
//                                                         disabled={loading}
//                                                         className="bg-blue-500 text-white px-3 py-1 rounded-md
//                                                                  hover:bg-blue-600 text-sm transition duration-200
//                                                                  disabled:bg-blue-300"
//                                                     >
//                                                         {loading ? 'Loading...' : 'View PDF'}
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         <p className="text-sm text-gray-500">
//                                             No submissions yet.
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ScientistDashboard;