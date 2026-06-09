import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export async function GET() {
  const authParams = imagekit.helper.getAuthenticationParameters();
  return Response.json(authParams);
}
