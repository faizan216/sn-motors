import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    color: { type: String, default: "bg-blue-50 border-blue-300 hover:border-blue-500 hover:bg-blue-100" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);