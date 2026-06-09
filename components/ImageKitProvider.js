"use client";

import { ImageKitProvider as IKProvider } from "@imagekit/react";

export default function ImageKitProvider({ children }) {
  return (
    <IKProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      authenticator={async () => {
        const res = await fetch("/api/imagekit-auth");
        return res.json();
      }}
    >
      {children}
    </IKProvider>
  );
}
