import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Only return text, no options or anything else."
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedSummary = response.choices[0].message.content;
    // return res.status(200).json({ enhancedSummary });
    return res.status(200).json({ enhancedContent: enhancedSummary });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Only return text, no options or anything else."
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedSummary = response.choices[0].message.content;
    return res.status(200).json({ enhancedSummary });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!resumeText) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const systemPrompt = "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `Extract data from this resume: ${resumeText} 
Provide data in the following JSON format with no additional text before or after:
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: 'Untitled Resume' },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },
    professional_summary: { type: String, default: '' },
    skills: [{ type: String }],
    personal_info: {
        image: { type: String, default: '' },
        full_name: { type: String, default: '' },
        profession: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' }
    },
    experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean }
        }
    ],
    projects: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
            start_date: { type: String },
            end_date: { type: String }
        }
    ],
    education: [
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            gpa: { type: String }
        }
    ]
}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    // const newResume = await Resume.create({ userId, title, ...parsedData });

    const resumePayload = {
      userId, 
      title: title || parsedData.title || "Untitled Resume",
      public: parsedData.public || false,
      template: parsedData.template || "classic",
      accent_color: parsedData.accent_color || "#3B82F6",
      professional_summary: parsedData.professional_summary || "",
      skills: parsedData.skills || [],
      personal_info: parsedData.personal_info || {},
      experience: parsedData.experience || [],
      projects: parsedData.projects || [],
      education: parsedData.education || [],
    };

    // 🧩 Create in MongoDB
    const newResume = await Resume.create(resumePayload);

    // const newResume = await Resume.create({
    //   userId,
    //   ...parsedData,
    //   title: title || parsedData.title || "Untitled Resume", 
    // });


    return res.json({ resumeId: newResume._id });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
