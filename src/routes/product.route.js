import express from "express";
import ProductsController from "../controllers/Products/ProductsController.js";
const router = express.Router();

router.get("/", ProductsController.getAllProduct);
router.post("/", ProductsController.createProduct);
router.get("/:id", ProductsController.getProductById);
router.put("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);

export default router;
