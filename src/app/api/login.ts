import { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { login, password } = req.body;

    try {
      const response = await api.post("login.fcgi", { login, password });
      const session = response.data.session;

      // Set the cookie
      res.setHeader("Set-Cookie", `session=${session}; HttpOnly; Path=/`);

      // Respond with a success message
      res.status(200).json({ message: "Login successful", session });
    } catch (error) {
      // Handle any errors
      res
        .status(500)
        .json({ message: "Login failed", error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
