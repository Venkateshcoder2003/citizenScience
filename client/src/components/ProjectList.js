import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Projects</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map(project => (
                        <div
                            key={project._id}
                            className="bg-white overflow-hidden shadow rounded-lg"
                        >
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                                {project.description && (
                                    <p className="mt-2 text-gray-600">{project.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ProjectList;