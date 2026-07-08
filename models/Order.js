import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId:   { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  quantity:    { type: Number, required: true },
  image:       { type: String },
  category:    { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    customer: {
      name:    { type: String, required: true },
      phone:   { type: String, required: true },
      email:   { type: String, default: "" },
      address: { type: String, required: true },
      city:    { type: String, required: true },
    },
    items:       { type: [OrderItemSchema], required: true },
    subtotal:    { type: Number, required: true },
    shipping:    { type: Number, default: 0 },
    total:       { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "JazzCash", "EasyPaisa", "Bank Transfer"],
      default: "COD",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

// Auto-generate order number before save
OrderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.models.Order.countDocuments();
    this.orderNumber = `SN-${String(count + 1001).padStart(4, "0")}`;
  }
  next();
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
