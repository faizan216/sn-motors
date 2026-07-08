import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"], trim: true },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    image: { type: String, required: [true, "Image URL is required"] },
    description: { type: String, required: [true, "Description is required"] },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Headlights","Tail Lights","Bodykit","Conversion","Grill","Spoilers","Carbon Fiber","Trims","Matts","PPF","Android Panel"],
    },
    stock: { type: Number, required: true, min: 0, default: 0 },
    brand: { type: String, default: "OEM" },
    sku: { type: String, unique: true, sparse: true },
    rating: { type: Number, default: 4.0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text" });

if (mongoose.models.Product) { delete mongoose.models.Product; }

export default mongoose.model("Product", ProductSchema);
