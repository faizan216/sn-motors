import mongoose from "mongoose";
import crypto from "crypto";

const AdminSettingsSchema = new mongoose.Schema(
  {
    key:   { type: String, required: true, unique: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AdminSettings ||
  mongoose.model("AdminSettings", AdminSettingsSchema);
