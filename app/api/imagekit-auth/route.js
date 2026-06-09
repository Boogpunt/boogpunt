import ImageKit from "@imagekit/nodejs";

export async function GET() {
  const imagekit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });
  const authParams = imagekit.helper.getAuthenticationParameters();
  return Response.json(authParams);
}
