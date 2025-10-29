// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom';
// import { dummyResumeData } from '../assets/assets';
// import {
//   ArrowLeft,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   FileText,
//   Briefcase,
//   GraduationCap,
//   Folder,
//   Sparkles,
//   Share2Icon,
//   EyeOffIcon,
//   DownloadIcon,
//   EyeIcon,
// } from "lucide-react";
// import PersonalInfoForm from '../components/PersonalInfoForm';
// import ResumePreview from '../components/ResumePreview';
// import TemplateSelector from '../components/TemplateSelector';
// import ColorPicker from '../components/ColorPicker';
// import ProfessionalSummaryForm from '../components/ProfessionalSummaryform';
// import ExperienceForm from '../components/ExperienceForm';
// import EducationForm from '../components/EducationForm';
// import ProjectForm from '../components/ProjectForm';
// import SkillsForm from '../components/SkillsForm';
// import { useSelector } from 'react-redux';
// import { toast } from "react-hot-toast";
// import api from "../configs/api";


// const ResumeBuilder = () => {

//   const { resumeId } = useParams()
//   const { token } = useSelector(state => state.auth);
//   const [isLoading, setIsLoading] = useState(true);



//   const [resumeData, setResumeData] = useState({
//     id: '',
//     title: '',
//     personal_info: {},
//     professional_summary: "",
//     experience: [],
//     education: [],
//     project: [],
//     skills: [],
//     template: "classic",
//     accent_color: "#3B82F6",
//     public: false,
//   });

//   const loadExistingResume = async () => {
//     setIsLoading(true);
//     try {
//       const { data } = await api.get('/api/resumes/get/' + resumeId, {
//         headers: { Authorization: token }
//       })
//       const fetched = data?.resume;
//       if (data?.resume && typeof data.resume === "object") {
//         // setResumeData(data.resume)
//         setResumeData(prev => ({
//           ...prev, ...(fetched || {}),
//         }))
//         document.title = data.resume.title || "Untitled Resume";
//       } else {
//         toast.error("Resume not found");
//       }
//     } catch (error) {
//       console.log(error.message)
//     }
//     finally {
//       setIsLoading(false);
//     }
//   }


//   const [activeSectionIndex, setActiveSectionIndex] = useState(0)
//   const [removeBackground, setRemoveBackground] = useState(false)

//   const sections = [
//     {
//       id: "personal",
//       name: "Personal Info",
//       icon: User
//     },
//     {
//       id: "summary",
//       name: "Summary",
//       icon: FileText
//     },
//     {
//       id: "experience",
//       name: "Experience",
//       icon: Briefcase
//     },
//     {
//       id: "education",
//       name: "Education",
//       icon: GraduationCap
//     },
//     {
//       id: "projects",
//       name: "Projects",
//       icon: Folder
//     },
//     {
//       id: "skills",
//       name: "Skills",
//       icon: Sparkles
//     },
//   ]

//   const activeSection = sections[activeSectionIndex]

//   useEffect(() => {
//     loadExistingResume()
//   }, [])

//   const changeResumeVisibility = async () => {
//     try {
//       const formData = new FormData()
//       formData.append("resumeId", resumeId)
//       formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
//       const { data } = await api.put('/api/resumes/update', formData, {
//         headers: { Authorization: token }
//       })
//       setResumeData({ ...resumeData, public: !resumeData.public })
//       toast.success(data.message)
//     } catch (error) {
//       console.error("Error saving resume:", error)
//     }
//   }

//   const handleShare = () => {
//     const frontendUrl = window.location.href.split('/app/')[0];
//     const resumeUrl = frontendUrl + '/view/' + resumeId;

//     if (navigator.share) {
//       navigator.share({
//         url: resumeUrl,
//         text: "My Resume"
//       })
//     } else {
//       alert('Share not supported on this browser.')
//     }
//   }

//   const downloadResume = () => {
//     window.print();
//   }

//   const saveResume = async () => {
//     try {
//       let updatedResumeData = structuredClone(resumeData)
//       if (typeof resumeData.personal_info.image === 'object') {
//         delete updatedResumeData.personal_info.image
//       }
//       const formData = new FormData();
//       formData.append("resumeId", resumeId)
//       formData.append('resumeData', JSON.stringify(updatedResumeData))
//       removeBackground && formData.append("removeBackground", "yes");
//       typeof resumeData.personal_info.image === 'object' && formData.append("image",
//         resumeData.personal_info.image)

//       const { data } = await api.put('/api/resumes/update', formData, {
//         headers: { Authorization: token }
//       })
//       setResumeData(data.resume)
//       toast.success(data.message)
//     } catch (error) {
//       console.error("Error saving resume:", error)
//     }
//   }

//   return (
//     <div>
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <Link
//           to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
//           <ArrowLeft className="size-4" />
//           Back to Dashboard
//         </Link>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 pb-8">
//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* Left Panel - Form */}
//           <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
//             <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
//               {/* Progress bar using activeSectionIndex */}
//               <div className="relative h-1 mb-6">
//                 <hr className="absolute top-0 left-0 right-0 border-0 h-1 bg-gray-200" />
//                 <hr
//                   className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
//                   style={{ width: `${(activeSectionIndex * 100) / (sections.length - 1)}%` }}
//                 />
//               </div>

//               {/* Section Navigation */}
//               <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
//                 <div className='flex items-center gap-2'>
//                   <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
//                   <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
//                 </div>
//                 <div className="flex items-center">
//                   {activeSectionIndex !== 0 && (
//                     <button
//                       onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
//                       className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
//                       disabled={activeSectionIndex === 0}
//                     >
//                       <ChevronLeft className="size-4" /> Previous
//                     </button>
//                   )}

//                   <button
//                     onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))}
//                     className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
//                     disabled={activeSectionIndex === sections.length - 1}
//                   >
//                     Next <ChevronRight className="size-4" />
//                   </button>
//                 </div>
//               </div>
//               {/* Form Content */}
//               <div className='space-y-6'>
//                 {activeSection.id === 'personal' && (
//                   <PersonalInfoForm
//                     data={resumeData.personal_info}
//                     onChange={(data) => setResumeData(prev => ({
//                       ...prev,
//                       personal_info: data
//                     }))}
//                     removeBackground={removeBackground}
//                     setRemoveBackground={setRemoveBackground}
//                   />
//                 )}
//                 {activeSection.id === 'summary' && (
//                   <ProfessionalSummaryForm
//                     data={resumeData.professional_summary}
//                     onChange={(data) => setResumeData(prev => ({
//                       ...prev,
//                       professional_summary: data
//                     }))}
//                     setResumeData={setResumeData}
//                   />
//                 )}
//                 {activeSection.id === 'experience' && (
//                   <ExperienceForm
//                     data={resumeData.experience}
//                     onChange={(data) => setResumeData(prev => ({
//                       ...prev,
//                       experience: data
//                     }))}
//                   />
//                 )}
//                 {activeSection.id === 'education' && (
//                   <EducationForm
//                     data={resumeData.education}
//                     onChange={(data) => setResumeData(prev => ({
//                       ...prev,
//                       education: data
//                     }))}
//                   />
//                 )}
//                 {activeSection.id === 'projects' && (
//                   <ProjectForm
//                     data={resumeData.project}
//                     onChange={(data) => setResumeData(prev => ({
//                       ...prev,
//                       project: data
//                     }))}
//                   />
//                 )}
//                 {activeSection.id === 'skills' && (
//                   <SkillsForm data={resumeData.skills} onChange={(data) =>
//                     setResumeData(prev => ({ ...prev, skills: data }))} />
//                 )}
//               </div>
//               <button onClick={() => { toast.promise(saveResume, { loading: 'Saving...' }) }} className='bg-gradient-to-br from-green-100 to-green-200
//     ring-green-300 text-green-600 ring hover:ring-green-400
//     transition-all rounded-md px-6 py-2 mt-6 text-sm'>
//                 Save Changes
//               </button>
//             </div>
//           </div>

//           {/* Right Panel - Preview */}
//           <div className='lg:col-span-7 max-lg:mt-6'>
//             <div className='relative w-full'>
//               <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
//                 {resumeData.public && (
//                   <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
//                     <Share2Icon className='size-4' /> Share
//                   </button>
//                 )}
//                 <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs
// bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600
// ring-purple-300 rounded-lg hover:ring transition-colors'>
//                   {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
//                   {resumeData.public ? 'Public' : 'Private'}
//                 </button>
//                 <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs
// bg-gradient-to-br from-green-100 to-green-200 text-green-600
// rounded-lg ring-green-300 hover:ring transition-colors'>
//                   <DownloadIcon className='size-4' /> Download
//                 </button>
//               </div>
//             </div>

//             {isLoading ? (
//               <div className="text-center py-10 text-gray-500">Loading resume...</div>
//             ) : resumeData ? (
//               <ResumePreview
//                 data={resumeData}
//                 template={resumeData?.template || "classic"}
//                 accentColor={resumeData?.accent_color || "#3B82F6"}
//               />
//             ) : (
//               <div className="text-center py-10 text-red-500">Resume not found</div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ResumeBuilder


import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Folder,
  Sparkles,
  Share2Icon,
  EyeOffIcon,
  DownloadIcon,
  EyeIcon,
} from "lucide-react";
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryform';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import api from "../configs/api";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const [resumeData, setResumeData] = useState({
    id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: token },
      });

      const fetched = data?.resume;

      if (fetched && typeof fetched === "object") {
        // ✅ Merge safely without wiping defaults
        setResumeData(prev => ({
          ...prev,
          ...(fetched || {}),
          personal_info: {
            ...prev.personal_info,
            ...(fetched?.personal_info || {}),
          },
          template: fetched?.template || prev.template || "classic",
          accent_color: fetched?.accent_color || prev.accent_color || "#3B82F6",
        }));

        document.title = fetched?.title || "Untitled Resume";
      }
    } catch (error) {
      console.error("Error loading resume:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: Folder },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      setResumeData(prev => ({ ...prev, public: !prev.public }));
      toast.success(data.message);
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({
        url: resumeUrl,
        text: "My Resume",
      });
    } else {
      alert('Share not supported on this browser.');
    }
  };

  const downloadResume = () => window.print();

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append('resumeData', JSON.stringify(updatedResumeData));

      if (removeBackground) formData.append("removeBackground", "yes");
      if (typeof resumeData.personal_info.image === 'object') {
        formData.append("image", resumeData.personal_info.image);
      }

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token },
      });

      // ✅ Prevent null overwrites
      if (data?.resume && typeof data.resume === "object") {
        setResumeData(prev => ({
          ...prev,
          ...(data.resume || {}),
          personal_info: {
            ...prev.personal_info,
            ...(data.resume?.personal_info || {}),
          },
        }));
      }

      // toast.success(data.message);
      return Promise.resolve(data);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress bar */}
              <div className="relative h-1 mb-6">
                <hr className="absolute top-0 left-0 right-0 border-0 h-1 bg-gray-200" />
                <hr
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
                  style={{
                    width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                  }}
                />
              </div>

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData?.template || "classic"}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData?.accent_color || "#3B82F6"}
                    onChange={(color) =>
                      setResumeData((prev) => ({ ...prev, accent_color: color }))
                    }
                  />
                </div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && "opacity-50"
                      }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Form */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>

              <button
                // onClick={() =>
                //   toast.promise(saveResume(), { loading: "Saving..." })
                // }
                  onClick={() =>
                    toast.promise(saveResume(), {
                      loading: "Saving...",
                      success: "Saved successfully",
                      error: "Failed to save",
                    })
                  }

                  className="bg-gradient-to-br from-green-100 to-green-200
                  ring-green-300 text-green-600 ring hover:ring-green-400
                  transition-all rounded-md px-6 py-2 mt-6 text-sm"
              >
                  Save Changes
                </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs
                    bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600
                    ring-purple-300 rounded-lg hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs
                    bg-gradient-to-br from-green-100 to-green-200 text-green-600
                    rounded-lg ring-green-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>

            {/* ✅ Prevent null template crash */}
            {/* {isLoading ? (
              <div className="text-center py-10 text-gray-500">
                Loading resume...
              </div>
            ) : resumeData && resumeData.template ? ( */}
            <ResumePreview
              data={resumeData}
              template={resumeData?.template || "classic"}
              accentColor={resumeData?.accent_color || "#3B82F6"}
            />
            {/* ) 
             : (
          
             <div className="text-center py-10 text-red-500">
                 Resume not found
               </div>
             )
            } */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
