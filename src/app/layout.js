import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderRepository from "./lib/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Arevik B&B",
    template: "%s | Arevik B&B",
  },
  description:
    "Stay at Arevik B&B in Ch’iva, Armenia. Comfortable rooms, great amenities, and warm hospitality.",
  openGraph: {
    type: "website",
    siteName: "Arevik B&B",
    title: "Arevik B&B",
    description:
      "Stay at Arevik B&B in Ch’iva, Armenia. Comfortable rooms, great amenities, and warm hospitality.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Arevik B&B",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arevik B&B",
    description:
      "Stay at Arevik B&B in Ch’iva, Armenia. Comfortable rooms, great amenities, and warm hospitality.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
};

const headerData = await HeaderRepository.getInstance().getModels();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Header
            data={headerData}
          />
        <main>{children}</main>
        <Footer data={headerData} />
      </body>
    </html>
  );
}
