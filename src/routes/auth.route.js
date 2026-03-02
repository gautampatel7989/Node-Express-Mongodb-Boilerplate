import express from "express";
import AuthController from "../controllers/Auth/AuthController.js";
import validate from "../middleware/Validate.js";
import { loginSchema } from "../validations/AuthValidation.js";

const router = express.Router();

router.post("/login", validate(loginSchema), AuthController.loginUser);

export default router;
