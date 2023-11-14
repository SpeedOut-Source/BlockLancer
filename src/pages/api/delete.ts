import { deleteDoc, doc } from "firebase/firestore";
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
    const { id } = req.query;

    if (!id) return res.status(400).json({ message: "Bad Request" });

    const docRef = doc(db, "gigs", id as string);

    await deleteDoc(docRef);

    return res
      .status(200)
      .json({ message: "File delete successfully", id: id });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
