import type { Metadata } from "next";
import { Poppins, Inter, Manrope, Work_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/tailwind/cn";
import { AppContextContainer } from "@/app/context";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const manoRope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "46 Trials",
  description: "Instant Data Retrieval Across Health Systems using OneRecord",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          poppins.className,
          inter.className,
          manoRope.className,
          workSans.className
        )}
      >
        <AppContextContainer>
          {children}
          <Toaster position="top-center" />
        </AppContextContainer>
      </body>
    </html>
  );
}
