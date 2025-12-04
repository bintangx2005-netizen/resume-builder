import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../configs/api'

const ExperienceForm = ({ data, onChange}) => {

    const { token } = useSelector(state => state.auth)
    const [generatingIndex, setIsGeneratingIndex] = useState(-1)
    
        const addExperience = () =>{
            const newExperience = {
                company: "",
                position: "",
                start_date: "",
                end_date: "",
                description: "",
                is_current: false
            };
            onChange([...data, newExperience])
        }

    const removeExperience = (index)=>{
        const updated = data.filter((_, i)=> i !== index);
        onChange(updated)
    }

    const updatedExperience = (index, field, value)=>{
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}

        // VALIDASI: Start date tidak boleh lebih besar dari end date
        if (!current.is_current && current.start_date && current.end_date) {
            const start = new Date(current.start_date);
            const end = new Date(current.end_date);

            if (start > end) {
                toast.error("Start date cannot be later than end date.");
                return; // hentikan update
            }
        }

    updated[index] = current;
        onChange(updated)
    }

    const generateDescription = async (index) => {
        setIsGeneratingIndex(index)
        const experience = data [index]
        const prompt = `Enhance this job description ${experience.description} for the position of ${experience.position} ata ${experience.company}.`

        try {
            const { data } = await api.post('/ai/enhance-job-desc', {userContent: prompt}, {headers: {Authorization: token}})
            updatedExperience(index, "description", data.enhancedContent)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsGeneratingIndex(-1)
        }
    }

  return (
    <div className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
                <p className='text-sm text-gray-500'>Add your job experience</p>
            </div>
            <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50'>
                <Plus className='size-4'/>
                Add Experience
            </button>
        </div>
        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
                <p>No work experiece added yet.</p>
                <p>Click "Add experience" to get started.</p>
            </div>
        ): (
            <div className='space-y-4'>
                {data.map((experience, index)=> (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                        <div className='flex justify-between items-start'>
                            <h4>Experience #{index + 1}</h4>
                            <button onClick={()=> removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>
                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={experience.company || ""} onChange={(e)=> updatedExperience(index, "company", e.target.value)} type="text" placeholder="Company Name" className='px-3 py-2 text-sm rounded-lg'/>
                            <input value={experience.position || ""} onChange={(e)=> updatedExperience(index, "position", e.target.value)} type="text" placeholder="Job Title" className='px-3 py-2 text-sm rounded-lg'/>
                            <input value={experience.start_date || ""} onChange={(e)=> updatedExperience(index, "start_date", e.target.value)} type="month" className='px-3 py-2 text-sm rounded-lg'/>
                            <input value={experience.end_date || ""} onChange={(e)=> updatedExperience(index, "end_date", e.target.value)} type="month" disabled={experience.is_current} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'/>
                        
                        </div>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" checked={experience.is_current || false} onChange={(e)=>{updatedExperience(index,"is_current", e.target.checked ? true : false);}} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                            <span className='text-sm text-gray-700'>Currently working here</span>
                        </label>

                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <label className='text-sm font-medium'>Job Description</label>
                                <button onClick={()=> generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company}  className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                    {generatingIndex === index ? (<Loader2 className="w-3 h-3 animate-spin"/>): (<Sparkles className='w-3 h-3'/>)}
                                        Enchance with AI
                                </button>
                            </div>
                        </div>
                        <textarea value={experience.description || ""} onChange={(e)=> updatedExperience(index, "description", e.target.value)} rows={4} className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Describe your key responbilities and achivements...' />
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ExperienceForm