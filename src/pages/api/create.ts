import { addDoc, collection } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/lib/firebase/firebaseInit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const docRef = await addDoc(collection(db, "gigs"), req.body);
    return res
      .status(200)
      .json({ message: "File info added successfully", id: docRef.id });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
