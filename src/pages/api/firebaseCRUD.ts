import { type NextApiRequest, type NextApiResponse } from "next";
import {
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  collection,
  setDoc,
} from "firebase/firestore";
import { db } from "~/lib/firebase/firebaseInit";
import { z } from "zod";

const ShopSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
});

export type Shop = z.infer<typeof ShopSchema>;

const collections = {
  shops: collection(db, "shops"),
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collections.shops);
      res.status(200).json(querySnapshot.docs.map((x) => x.data()));
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      res.status(500).json({ error: "Unable to fetch data from Firebase" });
    }
  } else if (req.method === "POST") {
    try {
      const pData = await ShopSchema.safeParseAsync(req.body);
      if (!pData.success) {
        return res.status(500).json({ error: "Query invalid" });
      }
      await setDoc(doc(db, "shops", pData.data.id), pData.data);
      res.status(201).json({ message: "Data created" });
    } catch (error) {
      console.error("Error creating data in Firebase:", error);
      res.status(500).json({ error: "Unable to create data in Firebase" });
    }
  } else if (req.method === "PUT") {
    try {
      const pData = await ShopSchema.safeParseAsync(req.body);
      if (!pData.success) {
        return res.status(500).json({ error: "Query invalid" });
      }
      const { id, name } = pData.data;

      if (!name) {
        return res.status(500).json({ error: "Query invalid" });
      }

      const dataDocRef = doc(db, "shops", id);
      await updateDoc(dataDocRef, pData.data);
      res.status(200).json({ message: "Data updated" });
    } catch (error) {
      console.error("Error updating data in Firebase:", error);
      res.status(500).json({ error: "Unable to update data in Firebase" });
    }
  } else if (req.method === "DELETE") {
    try {
      const pData = await ShopSchema.safeParseAsync(req.body);
      if (!pData.success) {
        return res.status(500).json({ error: "Query invalid" });
      }
      const { id } = pData.data;
      const dataDocRef = doc(db, "shops", id);
      await deleteDoc(dataDocRef);
      res.status(200).json({ message: "Data deleted" });
    } catch (error) {
      console.error("Error deleting data from Firebase:", error);
      res.status(500).json({ error: "Unable to delete data from Firebase" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
