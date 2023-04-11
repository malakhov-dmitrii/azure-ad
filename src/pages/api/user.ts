import axios from "axios";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  const user = await axios.get("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${token as string}`,
    },
  });

  return res.status(200).json(user.data);
};

export default handler;
