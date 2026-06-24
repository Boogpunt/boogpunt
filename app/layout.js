import "./globals.css";
import ImageKitProvider from "@/components/ImageKitProvider";

export const metadata = {
  title: "BOOGPUNT",
  description: "Brand Experience Designer based in London",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ifp8ucb.css" />
      </head>
      <body>
        <ImageKitProvider>{children}</ImageKitProvider>
      </body>
    </html>
  );
}
