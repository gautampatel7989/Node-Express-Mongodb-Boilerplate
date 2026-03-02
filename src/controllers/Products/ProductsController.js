import { Product } from "../../models/Product.model.js";

class ProductsController {
  constructor(Product) {
    this.Product = Product;
  }

  getAllProduct = async (req, res) => {
    try {
      const response = await this.Product.find().select("-__v");
      return res.status(200).json({
        success: true,
        message: "All Product List",
        data: response,
      });
    } catch (err) {
      console.error(err);
    }
  };

  createProduct = async (req, res) => {
    try {
      const { name, description, price, quantity } = req.body;
      const response = await this.Product.create({
        name,
        description,
        price,
        quantity,
      });

      return res.status(201).json({
        success: true,
        message: "Product has been created successfully",
        data: response,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.Product.findById(id).select("-__v");
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "Product not found with the provided ID",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Get Product by id",
        data: response,
      });
    } catch (err) {
      console.error(err);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, quantity, status } = req.body;
      const response = await this.Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        quantity,
        status,
      }).select("-__v");
      return res.status(200).json({
        success: true,
        message: "Product has been updated successfully",
        data: response,
      });
    } catch (err) {
      console.error(err);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.Product.findByIdAndDelete(id).select("-__v");
      return res.status(200).json({
        success: true,
        message: "Product has been deleted successfully",
        data: response,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export default new ProductsController(Product);
