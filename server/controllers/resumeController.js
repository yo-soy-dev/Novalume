import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';
import _ from "lodash";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({
      message: 'Resume created successfully',
      resume: newResume
    });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    console.log("userId:", userId);
    console.log("resumeId:", resumeId);

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;


    return res.status(200).json(resume);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json(resume);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// export const updateResume = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { resumeId, resumeData, removeBackground } = req.body;
//     const image = req.file;

//     let resumeDataCopy;
//     if (typeof resumeData === 'string') {
//       resumeDataCopy = await JSON.parse(resumeData)
//     } else {
//       resumeDataCopy = structuredClone(resumeData)
//     }

//     if (image) {
//       const imageBufferData = fs.createReadStream(image.path);

//       const response = await imageKit.files.upload({
//         file: imageBufferData,
//         fileName: 'resume.png',
//         folder: 'user-resumes',
//         transformation: {
//           pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
//         }
//       });

//       resumeDataCopy.personal_info.image = response.url;
//     }

//     const resume = await Resume.findOneAndUpdate(
//       { userId, _id: resumeId },
//       // resumeDataCopy,
//       { $set: resumeDataCopy },
//       { new: true, runValidators: true }
//     );

//     console.log("📤 Sending resume update:", {
//   resumeId,
//   resumeData
// });


//      if (!resume) {
//       return res.status(404).json({ message: "Resume not found" });
//     }


//     return res.status(200).json({ message: 'Saved successfully', resume });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };


export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    console.log("===== UPDATE RESUME REQUEST =====");
    console.log("User ID:", userId);
    console.log("Resume ID:", resumeId);
    console.log("Has image file:", !!image);
    console.log("Remove background:", removeBackground);
    console.log("Raw resumeData type:", typeof resumeData);

    let resumeDataCopy =
      typeof resumeData === "string" ? JSON.parse(resumeData) : resumeData;

    if (!resumeDataCopy) {
      console.log("❌ No resumeData received");
      return res.status(400).json({ message: "Missing resume data" });
    }

    console.log("Incoming resumeData keys:", Object.keys(resumeDataCopy || {}));
    console.log("Incoming title:", resumeDataCopy.title);

    if (resumeDataCopy._id) {
      delete resumeDataCopy._id;
      console.log("Removed _id from resumeDataCopy");
    }

    const oldResume = await Resume.findOne({ userId, _id: resumeId });
    if (!oldResume) {
      console.log("❌ Resume not found for user:", userId);
      return res.status(404).json({ message: "Resume not found" });
    }

    console.log("Old title in DB:", oldResume.title);

    if (!resumeDataCopy.title || resumeDataCopy.title.trim() === "") {
      console.log("⚠️ Title missing in update — preserving old title");
      resumeDataCopy.title = oldResume.title;
    }

    if (image) {
      console.log("📸 Uploading new image to ImageKit...");
      const imageBufferData = fs.createReadStream(image.path);
      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      console.log("✅ Image uploaded:", response.url);
      resumeDataCopy.personal_info = {
        ...oldResume.personal_info,
        ...resumeDataCopy.personal_info,
        image: response.url,
      };
    }

    // 🧩 Merge old and new data
    const updatedResumeData = _.merge({}, oldResume.toObject(), resumeDataCopy);
    updatedResumeData.updatedAt = new Date();

    console.log("✅ Final merged data preview:");
    console.log({
      title: updatedResumeData.title,
      updatedAt: updatedResumeData.updatedAt,
      hasPersonalInfo: !!updatedResumeData.personal_info,
      hasExperience: !!updatedResumeData.experience,
    });

    // 🧩 Save
    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      updatedResumeData,
      { new: true }
    );

    console.log("✅ Resume successfully updated in MongoDB");
    console.log("===========================================");

    return res.status(200).json({ message: "Saved successfully", resume });
  } catch (error) {
    console.error("❌ Update Resume Error:", error);
    return res.status(400).json({ message: error.message });
  }
};
