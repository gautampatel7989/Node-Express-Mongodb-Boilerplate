import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Products", ProductSchema);
