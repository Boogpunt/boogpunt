import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ImageKitProvider from "@/components/ImageKitProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BOOGPUNT",
  description: "Brand Experience Designer based in London",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ImageKitProvider>{children}</ImageKitProvider>
      </body>
    </html>
  );
}
