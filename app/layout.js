import "./globals.css";
import ImageKitProvider from "@/components/ImageKitProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "BOOGPUNT",
  description: "Brand Experience Designer based in London",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ifp8ucb.css" />
      </head>
      <body>
        <ImageKitProvider>{children}</ImageKitProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
