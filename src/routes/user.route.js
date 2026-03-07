import express from "express";
import UserController from "../controllers/Users/UserController.js";
import { createUserSchema } from "../validations/UserValidation.js";
import validate from "../middleware/Validate.js";
import checkPermission from "../middleware/RolePermissionCheck.js";

const router = express.Router();

router.get(
  "/",
  checkPermission("user.read"),
  UserController.getAllUsers,
);
router.get("/:id", UserController.getUserById);
router.post("/", validate(createUserSchema), UserController.createUser);
router.put("/:id", validate(createUserSchema), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
