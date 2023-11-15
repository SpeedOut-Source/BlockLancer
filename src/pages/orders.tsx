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
      <div className="flex flex-col mx-10 gap-y-4">
      <div className="w-full bg-white/40">
      <div>Order ID : asdasdasd</div></div>
      <div className="w-full bg-white/40">
      <div>Order ID : qeqwe</div></div>
      <div className="w-full bg-white/40">
      <div>Order ID : dfgbvdfg</div></div>
      <div className="w-full bg-white/40">
      <div>Order ID : zxczxczx</div></div>
      </div>

      </>
      );
    }
