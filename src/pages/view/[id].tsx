import { type GetServerSidePropsContext } from "next";
import SellGig from "../create";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/lib/firebase/firebaseInit";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const notFound = { notFound: true };

  if (!id || typeof id !== "string") {
    return notFound;
  }

  try {
    const gig = await getDoc(doc(db, "gigs", id));

    if (!gig.exists()) return notFound;

    return {
      props: gig.data(),
    };
  } catch {
    return notFound;
  }
}
export default SellGig;
