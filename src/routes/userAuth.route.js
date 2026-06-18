import express from "express";
import { body } from "express-validator";
import {
  checkAuth,
  login,
  logout,
  passwordReset,
  passwordResetToken,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleweare/checkAuth.middleweare.js";
import { uploadImage } from "../middleweare/upload.middleweare.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = express.Router();

//register route
router.post("/signup", registerSchema, register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/password-reset-token", isAuthenticated, passwordResetToken);
router.patch("/change-password", isAuthenticated, passwordReset);
router.patch(
  "/update-profile",
  isAuthenticated,
  uploadImage.single("image"),
  updateProfile,
);
router.get("/check-auth", isAuthenticated, checkAuth);

export default router;
