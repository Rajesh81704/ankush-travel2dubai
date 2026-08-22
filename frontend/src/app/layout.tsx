import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UserWrapper } from "@/components/layout/UserWrapper";
import { ReduxStoreProvider } from "@/store";
import { ChatBot } from "@/components/layout/ChatBot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Triptoo Travels - Curated Journeys, Premium Tour Packages & Visa Assistance",
  description:
    "Book luxury and budget travel tour packages, flight bookings, hotel stays, visa application assistance, and customized holiday itineraries with Triptoo Travels.",
  keywords: [
    "Triptoo Travels", "Tour Packages", "Holiday Packages", "Kashmir Tour Packages",
    "Meghalaya Tours", "Dubai Visa", "Flight Bookings", "Travel Agency Faridabad",
    "International Vacations", "Customized Itineraries"
  ],
  openGraph: {
    title: "Triptoo Travels - Curated Journeys & World Class Vacations",
    description: "Explore hand-crafted holiday packages, flights, hotels, and hassle-free visa processing.",
    url: "https://www.triptootravels.com",
    siteName: "Triptoo Travels",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
        className={`${inter.variable} font-sans antialiased bg-slate-900 text-slate-100 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600`}
      >
        <ReduxStoreProvider>
          <UserWrapper>
            <Navbar />
            {children}
            <ChatBot />
            <Footer />
            <Toaster />
          </UserWrapper>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
