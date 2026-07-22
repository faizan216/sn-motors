import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    category: {
      type: String, required: true,
      enum: ["Headlights","Tail Lights","Bodykit","Conversion","Grill","Spoilers","Carbon Fiber Trims","Interior","Matts","PPF","Android Panel"],
    },
    make:        { type: String, default: "" },
    model:       { type: String, default: "" },
    stock:       { type: Number, required: true, min: 0, default: 0 },
    brand:       { type: String, default: "OEM" },
    sku:         { type: String, unique: true, sparse: true },
    rating:      { type: Number, default: 4.0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", make: "text", model: "text" });
ProductSchema.index({ category: 1 });
ProductSchema.index({ make: 1, model: 1 });

if (mongoose.models.Product) { delete mongoose.models.Product; }
export default mongoose.model("Product", ProductSchema);