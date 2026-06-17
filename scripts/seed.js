/**
 * Seed script – run with: node scripts/seed.js
 * Requires MONGODB_URI in .env.local
 */
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const PRODUCTS = [
  {
    name: "Toyota Corolla Engine Rebuild Kit",
    price: 42500,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80",
    description: "Complete engine rebuild kit for Toyota Corolla 1.3L/1.6L engines (1998–2019). Includes gasket set, piston rings, main bearings, thrust washers, valve stem seals, and timing belt. OEM specifications for perfect fitment.",
    category: "Engine Parts",
    stock: 14,
    brand: "Nippon",
    sku: "ENG-TC-001",
    rating: 4.7,
    reviewCount: 83,
    featured: true,
  },
  {
    name: "Brembo Brake Pads – Front Axle",
    price: 7800,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    description: "High-performance ceramic front brake pads by Brembo. Low dust formula, consistent pedal feel, and 30% longer life than standard OEM pads. Compatible with Honda Civic, City, and Jazz 2014–2022.",
    category: "Brakes",
    stock: 31,
    brand: "Brembo",
    sku: "BRK-BP-002",
    rating: 4.9,
    reviewCount: 152,
    featured: true,
  },
  {
    name: "KYB Excel-G Shock Absorber – Rear Pair",
    price: 18900,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
    description: "KYB Excel-G twin-tube shock absorbers for the rear axle. Gas-charged for a stable, comfortable ride. Fits Suzuki Alto, Cultus, and Wagon R 2010–2023. Sold as a pair.",
    category: "Suspension",
    stock: 9,
    brand: "KYB",
    sku: "SUS-KYB-003",
    rating: 4.6,
    reviewCount: 67,
    featured: false,
  },
  {
    name: "Bosch Oxygen Sensor – Universal",
    price: 5400,
    image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=600&q=80",
    description: "Bosch wide-band oxygen sensor compatible with a wide range of Japanese and Korean vehicles. Restores fuel economy and reduces emissions. Plug-and-play installation with included connectors.",
    category: "Electrical",
    stock: 22,
    brand: "Bosch",
    sku: "ELC-O2-004",
    rating: 4.5,
    reviewCount: 41,
    featured: false,
  },
  {
    name: "Stainless Steel Cat-Back Exhaust – Honda City",
    price: 24000,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
    description: "304-grade stainless steel cat-back exhaust system for Honda City 1.5 (2017–2023). Increases exhaust flow by 22%, adds 8–12 HP at peak RPM, and features a deep, refined exhaust note.",
    category: "Exhaust",
    stock: 5,
    brand: "MagnaFlow",
    sku: "EXH-SS-005",
    rating: 4.8,
    reviewCount: 29,
    featured: true,
  },
  {
    name: "Front Bumper – Toyota Yaris 2020+",
    price: 13500,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    description: "OEM-spec front bumper for Toyota Yaris / Vitz 2020 and newer. High-impact polypropylene, UV-resistant coating, includes fog light housings. Ready to paint or available in standard white.",
    category: "Body Parts",
    stock: 7,
    brand: "ToyoParts",
    sku: "BDY-FB-006",
    rating: 4.4,
    reviewCount: 18,
    featured: false,
  },
  {
    name: "Mann Oil Filter – Multi-Vehicle Pack (3x)",
    price: 2100,
    image: "https://images.unsplash.com/photo-1558618047-f4e90c5e9e8b?w=600&q=80",
    description: "Pack of 3 MANN-Filter premium oil filters. Multi-layered filter media captures particles down to 20 microns. Compatible with most 1.0L–2.0L Japanese engines. Fits Suzuki, Toyota, Honda, and Daihatsu.",
    category: "Filters",
    stock: 60,
    brand: "MANN-Filter",
    sku: "FLT-OIL-007",
    rating: 4.8,
    reviewCount: 211,
    featured: true,
  },
  {
    name: "NGK Iridium Spark Plugs – Set of 4",
    price: 4800,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80",
    description: "NGK Laser Iridium spark plugs for superior ignitability and longer service life (up to 100,000 km). Set of 4 plugs for 4-cylinder engines. Fits Toyota, Honda, Suzuki, Mitsubishi, and Daihatsu.",
    category: "Engine Parts",
    stock: 45,
    brand: "NGK",
    sku: "ENG-SP-008",
    rating: 4.9,
    reviewCount: 318,
    featured: true,
  },
  {
    name: "Drilled & Slotted Brake Rotors – Front (Pair)",
    price: 11200,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    description: "Premium drilled and slotted front brake rotors for improved heat dissipation and wet-weather braking. Silver zinc dichromate coating prevents rust. Compatible with Toyota Corolla 2014–2022.",
    category: "Brakes",
    stock: 12,
    brand: "PowerStop",
    sku: "BRK-RT-009",
    rating: 4.7,
    reviewCount: 55,
    featured: false,
  },
  {
    name: "Coilover Suspension Kit – Honda Civic EK/EM",
    price: 68000,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
    description: "Height- and damper-adjustable coilover kit for Honda Civic 1996–2000 (EK/EM chassis). 32-way adjustable damping, adjustable ride height ±40mm, pillow-ball upper mounts included. Track-ready setup.",
    category: "Suspension",
    stock: 3,
    brand: "BC Racing",
    sku: "SUS-CO-010",
    rating: 4.9,
    reviewCount: 22,
    featured: true,
  },
  {
    name: "Philips LED Headlight Bulb Pair – H4",
    price: 6500,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    description: "Philips Ultinon Pro6000 H4 LED bulbs. Up to 230% more brightness vs halogen. 6200K cool white light, 50,000-hour rated lifespan, CANbus compatible. Plug-and-play fit for most Pakistani market cars.",
    category: "Lighting",
    stock: 38,
    brand: "Philips",
    sku: "LGT-H4-011",
    rating: 4.7,
    reviewCount: 97,
    featured: false,
  },
  {
    name: "Sachs Clutch Kit – Suzuki Mehran / Alto",
    price: 9800,
    image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=600&q=80",
    description: "Complete SACHS clutch replacement kit for Suzuki Mehran F10A and Alto VXL/VXR. Includes clutch disc, pressure plate, and release bearing. OEM-spec torque capacity for smooth city and highway driving.",
    category: "Transmission",
    stock: 17,
    brand: "SACHS",
    sku: "TRN-CK-012",
    rating: 4.6,
    reviewCount: 74,
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const Product = require("../models/Product.js").default ||
      mongoose.model("Product", new mongoose.Schema({
        name: String, price: Number, image: String, description: String,
        category: String, stock: Number, brand: String, sku: String,
        rating: Number, reviewCount: Number, featured: Boolean,
      }, { timestamps: true }));

    await mongoose.connection.collection("products").drop().catch(() => {});
    const inserted = await Product.insertMany(PRODUCTS);
    console.log(`✅ Seeded ${inserted.length} products`);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
    process.exit(0);
  }
}

seed();
