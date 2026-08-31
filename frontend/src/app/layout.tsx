import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UserWrapper } from "@/components/layout/UserWrapper";
import { ReduxStoreProvider } from "@/store";
import { ChatBot } from "@/components/layout/ChatBot";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { DynamicFavicon } from "@/components/common/DynamicFavicon";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travel2Dubai - Curated Journeys, Premium Tour Packages & Visa Assistance",
  description:
    "Book luxury and budget Travel2Dubai tour packages, flight bookings, hotel stays, visa application assistance, and customized holiday itineraries.",
  keywords: [
    "Travel2Dubai", "Dubai Tour Packages", "Holiday Packages", "Dubai Visa",
    "Desert Safari", "Flight Bookings", "International Vacations", "Customized Itineraries"
  ],
  openGraph: {
    title: "Travel2Dubai - Curated Journeys & World Class Vacations",
    description: "Explore hand-crafted holiday packages, flights, hotels, and hassle-free visa processing.",
    url: "https://travel2dubai.co.in",
    siteName: "Travel2Dubai",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
            <SiteSettingsProvider>
              <DynamicFavicon />
              <Navbar />
              {children}
              <ChatBot />
              <Footer />
              <Toaster />
            </SiteSettingsProvider>
          </UserWrapper>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
