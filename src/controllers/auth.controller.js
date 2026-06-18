import bcryptjs from "bcryptjs";
import { userModel } from "../models/user.model";
import { uploadToCloudinary } from "../services/cloudinaryUpload";
import { registerSchema } from "../validators/auth.validator";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

export const register = async (req, res) => {
  try {
    // Validate Request Body
    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    const { name, email, password, role, phone } = validationResult.data;

    // Check Existing User
    const isExist = await userModel.findOne({
      email: email.toLowerCase(),
    });

    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Upload Profile Image (Optional)
    let profileImage = "";

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file,
        "shipment-management-system/users",
      );

      profileImage = uploadResult.secure_url;
    }

    // Hash Password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Create User
    const user = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      phone,
      profileImage,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not created",
      });
    }

    const accessToken = generateAccessToken(user._id, res);
    const hashedRefreshToken = await bcryptjs.hash(refreshToken, 12);

    user.refreshToken = hashedRefreshToken;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userInfo: {
        id: user._id,
        username: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
export const passwordResetToken = async (req, res) => {};
export const passwordReset = async (req, res) => {};
export const updateProfile = async (req, res) => {};
export const checkAuth = async (req, res) => {};
