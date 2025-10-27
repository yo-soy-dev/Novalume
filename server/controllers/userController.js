import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
    return jwt.sign(
 { id: userId },           
 process.env.JWT_SECRET,    
 { expiresIn: '7d' }        
 );
};


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(newUser._id)
     newUser.password = undefined;

    res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            token
        });

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

      const token = generateToken(user._id)
     newUser.password = undefined;

    res.status(201).json({
            message: 'Login successfully',
            user,
            token
        });


  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}


export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) { 
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = undefined;
    return res.status(200).json(user);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    const resumes = await Resume.find({ userId });
    return res.status(200).json(resumes);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//     });
//     return res.json({ success: true, message: "Logged Out" });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };