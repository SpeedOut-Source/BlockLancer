/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
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
    const data = req.body;
    if (data.id) {
      await setDoc(doc(db, "gigs", data.id as string), data);
      return res
        .status(200)
        .json({ message: "File info update successfully", id: data.id });
    } else {
      const docRef = await addDoc(collection(db, "gigs"), data);
      await updateDoc(doc(db, "gigs", docRef.id), { id: docRef.id });
      
      return res
        .status(200)
        .json({ message: "File info created successfully", id: docRef.id });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
