import { Router } from "express";
import { registerUser,loginUser,verifyOTP } from "../../controllers/Authentication/auth.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-otp").post(verifyOTP);
router.route("/login").post(loginUser);


export default router;