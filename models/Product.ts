import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    price: Number,
    stock: Number,
    category: String,
    images: [String],
  },
  { timestamps: true }
);

export default models.Product || mongoose.model("Product", ProductSchema);
