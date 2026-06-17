import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "SN Motors | Premium Car Parts & Accessories",
    template: "%s | SN Motors",
  },
  description: "Pakistan's trusted source for OEM and aftermarket car parts. Engine, brakes, suspension, exhaust, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
