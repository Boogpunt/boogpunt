import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export async function GET() {
  const authParams = imagekit.getAuthenticationParameters();
  return Response.json(authParams);
}
