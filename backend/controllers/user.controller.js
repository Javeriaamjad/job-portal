import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }

    if (role !== user.role) {
      return res.status(403).json({ message: "Role mismatch", success: false });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user,
      });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};


export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const skillsArray = skills.split(",");
    const userId = req.id; // Assumes middleware sets req.id after authentication

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // Updating the user details
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills = skillsArray || user.profile.skills;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile || {},
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
