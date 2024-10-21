import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CitizenDashboard() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            toast.error('Failed to fetch projects');
        }
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
    };

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!selectedProject || !pdfFile) {
    //         toast.error('Please select a project and a PDF file');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('pdf', pdfFile);
    //     formData.append('projectId', selectedProject._id);

    //     try {
    //         await axios.post('http://localhost:5000/api/projects/submit', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    //         toast.success('PDF submitted successfully');
    //         setPdfFile(null);
    //         setSelectedProject(null);
    //     } catch (error) {
    //         console.error('Failed to submit PDF:', error);
    //         toast.error('Failed to submit PDF');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProject || !pdfFile) {
            toast.error('Please select a project and a PDF file');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('projectId', selectedProject._id);

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
        } catch (error) {
            console.error('Failed to submit PDF:', error);
            toast.error('Failed to submit PDF');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Citizen Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Available Projects</h2>
                    {projects.map(project => (
                        <div
                            key={project._id}
                            className={`p-2 border rounded mb-2 cursor-pointer ${selectedProject?._id === project._id ? 'bg-blue-100' : ''}`}
                            onClick={() => handleProjectSelect(project)}
                        >
                            {project.title}
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Submit Data</h2>
                    {selectedProject ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Selected Project: {selectedProject.title}</label>
                                <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-2" />
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit PDF</button>
                            </div>
                        </form>
                    ) : (
                        <p>Please select a project to submit data.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CitizenDashboard;