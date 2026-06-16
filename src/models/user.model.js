import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
      minLength: [3, "username must be at least 3 characters"],
      maxLength: [30, "username must be at most 30 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trime: true,
    },
    password: {
      type: String,
      required: [true, "password is require"],
      minLength: [8, "password must be at least 8 characters"],
      maxLength: [100, "password must be at most 100 characters"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: {
        values: ["USER", "DELIVERY_AGENT", "ADMIN"],
        message: "role must be either USER, DELIVERY_AGENT, or ADMIN",
      },
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
      match: /^03\d{9}$/,
    },
    passwordResetToken: String,

    passwordResetTokenExpires: Date,

    refreshToken: String,
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
