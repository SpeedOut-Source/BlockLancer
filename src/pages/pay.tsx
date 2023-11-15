import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import Hero from "~/components/hero";
import { db } from "~/lib/firebase/firebaseInit";
import { type GigType } from "./create";
import Link from "next/link";
import { addrShort } from "~/lib/utils";


export default function Home({ data }: { data: GigType[] }) {
    return (
      <>
      <div>
        <div> upload file</div>
        <div>recieve payment</div>
      </div>

      </>
      );
    }
