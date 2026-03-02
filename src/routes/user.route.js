import express from "express";
import UserController from "../controllers/Users/UserController.js";
import { createUserSchema } from "../validations/UserValidation.js";
import validate from "../middleware/Validate.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", validate(createUserSchema), UserController.createUser);
router.put("/:id", validate(createUserSchema), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
