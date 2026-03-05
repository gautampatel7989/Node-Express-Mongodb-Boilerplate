import express from "express";
import AuthController from "../controllers/Auth/AuthController.js";
import validate from "../middleware/Validate.js";
import { loginSchema, registerSchema } from "../validations/AuthValidation.js";

const router = express.Router();

router.post("/login", validate(loginSchema), AuthController.loginUser);
router.post("/register", validate(registerSchema), AuthController.registerUser);

export default router;
