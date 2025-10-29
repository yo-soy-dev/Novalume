import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({ data, onChange }) => {

    const addProject = () => {
        const newProject = {
            institution: "",
            name: "",
            type: "",
            description: "",
            start_date: "",
            end_date: "",
            link: "",
        };
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i != index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        // <div>
         <div className="max-w-full p-4 sm:p-6 bg-white rounded-md shadow-sm">
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold
                    text-gray-900'> Projects </h3>
                    <p className='text-sm text-gray-500'>Add your projects details</p>
                </div>
                <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100
                text-green-700 rounded-lg hover:bg-green-200 transition-colors
                '>
                    <Plus className='size-4' />
                    Add Project
                </button>
            </div>

            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                        <div className='flex justify-between items-start'>
                            <h4>Project #{index + 1}</h4>
                            <button onClick={() => removeProject(index)}
                                className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                value={project.name || ""}
                                onChange={(e) => updateProject(index, "name", e.target.value)}
                                type="text"
                                placeholder="Project Name"
                                // className="px-3 py-2 text-sm rounded-lg"
                                 className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none break-words"
                            />
                            <input
                                value={project.type || ""}
                                onChange={(e) => updateProject(index, "type", e.target.value)}
                                type="text"
                                placeholder="Project Type"
                                // className="px-3 py-2 text-sm rounded-lg"
                                 className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none break-words"
                            />
                            <input
                                value={project.description || ""}
                                onChange={(e) => updateProject(index, "description", e.target.value)}
                                placeholder='Describe your Project...'
                                className="px-3 py-2 text-sm rounded-lg resize-none w-full col-span-2"
                            />
                            <div className="flex gap-2 col-span-2">
                                <input
                                    value={project.start_date || ""}
                                    onChange={(e) => updateProject(index, "start_date", e.target.value)}
                                    type="month"
                                    // className="px-3 py-2 text-sm w-1/2"
                                    className="w-full md:w-auto px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none"
                                />
                                <input
                                    value={project.end_date || ""}
                                    onChange={(e) => updateProject(index, "end_date", e.target.value)}
                                    type="month"
                                    // className="px-3 py-2 text-sm w-1/2"
                                    className="w-full md:w-auto px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none"
                                />
                            </div>

                            <input
                                value={project.link || ""}
                                onChange={(e) => updateProject(index, "link", e.target.value)}
                                type="url"
                                placeholder="Link (optional)"
                                className="px-3 py-2 text-sm rounded-lg"
                            />

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectForm
