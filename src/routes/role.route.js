import express from "express";
import RolesController from "../controllers/Access/RolesController.js";

const router = express.Router();
console.log("role route loaded");
router.get("/", RolesController.getAll);
router.post("/", RolesController.create);
router.get("/:id", RolesController.show);
router.put("/:id", RolesController.update);
router.delete("/:id", RolesController.deleteRole);

export default router;
