/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { collection, getDocs, query, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/lib/firebase/firebaseInit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { gigId } = req.query;

      if (!gigId) {
          return res.status(400).json({ message: "Bad Request" });
      }
      const q = query(collection(db, "gigBuy"), where("gigId", "==", gigId));
      const querySnapshot = await getDocs(q);

    return res
      .status(200)
      .json({ data: querySnapshot.docs.map((doc) => doc.data()) });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
