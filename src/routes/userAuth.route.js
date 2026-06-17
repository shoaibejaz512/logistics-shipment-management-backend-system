import express from "express";
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

const router = express.Router();

//register route
router.post("/signup", register);
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
