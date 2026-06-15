import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
      minLength: 3,
      maxLength: 30,
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
      select: false,
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["USER", "DELIVERY_AGENT", "ADMIN"],
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
