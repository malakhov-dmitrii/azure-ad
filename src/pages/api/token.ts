import axios from "axios";
import { type NextApiHandler } from "next";
import QueryString from "qs";
import { redis } from "~/server/db";

const handler: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  const refreshToken = await redis.get(token as string);

  const data = QueryString.stringify({
    client_id: "33dce5ac-b19a-41a7-8937-280d22cd1af9",
    scope: "https://graph.microsoft.com/mail.read",
    redirect_uri: "http://localhost:3000",
    grant_type: "refresh_token",
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: refreshToken,
  });

  const refresh = await axios.post(
    "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    data,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await redis.set(refresh.data.access_token as string, refreshToken);

  res.status(200).json(refresh.data);
};

export default handler;
