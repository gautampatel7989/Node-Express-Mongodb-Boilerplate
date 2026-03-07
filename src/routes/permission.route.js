import express from "express";
import PermissionController from "../controllers/Access/PermissionController.js";

const router = express.Router();

router.get("/", PermissionController.getAll);
router.post("/", PermissionController.create);
router.get("/:id", PermissionController.show);
router.put("/:id", PermissionController.update);
router.delete("/:id", PermissionController.deletePermission);

export default router;
