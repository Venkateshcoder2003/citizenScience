// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function ScientistDashboard() {
//     const [projects, setProjects] = useState([]);
//     const [newProject, setNewProject] = useState({ title: '', description: '' });

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     const fetchProjects = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/projects', {
//                 headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//             });
//             setProjects(response.data);
//         } catch (error) {
//             console.error('Failed to fetch projects:', error);
//             toast.error('Failed to fetch projects');
//         }
//     };

//     const handleInputChange = (e) => {
//         setNewProject({ ...newProject, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/api/projects', newProject, {
//                 headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//             });
//             toast.success('Project created successfully');
//             setNewProject({ title: '', description: '' });
//             fetchProjects();
//         } catch (error) {
//             console.error('Failed to create project:', error);
//             toast.error('Failed to create project');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Scientist Dashboard</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="title"
//                             value={newProject.title}
//                             onChange={handleInputChange}
//                             placeholder="Project Title"
//                             className="w-full p-2 mb-2 border rounded"
//                             required
//                         />
//                         <textarea
//                             name="description"
//                             value={newProject.description}
//                             onChange={handleInputChange}
//                             placeholder="Project Description"
//                             className="w-full p-2 mb-2 border rounded"
//                             required
//                         />
//                         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create Project</button>
//                     </form>
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
//                     {projects.map(project => (
//                         <div key={project._id} className="p-2 border rounded mb-2">
//                             <h3 className="font-semibold">{project.title}</h3>
//                             <p>{project.description}</p>
//                             <p>Submissions: {project.submissions.length}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ScientistDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ScientistDashboard() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', description: '' });

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
        }
    };

    const handleInputChange = (e) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/projects', newProject, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success('Project created successfully');
            setNewProject({ title: '', description: '' });
            fetchProjects();
        } catch (error) {
            console.error('Failed to create project:', error);
            toast.error('Failed to create project');
        }
    };

    const handleViewPDF = async (submissionId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/projects/submissions/${submissionId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                responseType: 'blob'
            });

            const fileUrl = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            window.open(fileUrl, '_blank');
        } catch (error) {
            console.error('Failed to fetch submission:', error);
            toast.error('Failed to fetch submission');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Scientist Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={newProject.title}
                            onChange={handleInputChange}
                            placeholder="Project Title"
                            className="w-full p-2 mb-2 border rounded"
                            required
                        />
                        <textarea
                            name="description"
                            value={newProject.description}
                            onChange={handleInputChange}
                            placeholder="Project Description"
                            className="w-full p-2 mb-2 border rounded"
                            required
                        />
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            Create Project
                        </button>
                    </form>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
                    {projects.map((project) => (
                        <div key={project._id} className="p-2 border rounded mb-2">
                            <h3 className="font-semibold">{project.title}</h3>
                            <p>{project.description}</p>
                            <p>Submissions: {project.submissions.length}</p>
                            {project.submissions.map((submission) => (
                                <div key={submission._id} className="mt-2">
                                    <button
                                        onClick={() => handleViewPDF(submission._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        View PDF
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ScientistDashboard;