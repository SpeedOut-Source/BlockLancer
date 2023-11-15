import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import Hero from "~/components/hero";
import { db } from "~/lib/firebase/firebaseInit";
import { type GigType } from "./create";
import Link from "next/link";
import { addrShort } from "~/lib/utils";

export async function getServerSideProps() {
  const empty = { props: {} };
  try {
    const gig = await getDocs(collection(db, "gigs"));

    if (gig.empty) return empty;
    const data = gig.docs.map((doc) => doc.data());

    return {
      props: { data },
    };
  } catch {
    return empty;
  }
}

export default function Home({ data }: { data: GigType[] }) {
  return (
    <>
      <Head>
        <title>BlockLancer</title>
        <meta
          name="description"
          content="Digital Services Marketplace: Empowering Freelancers with Blockchain"
        />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Hero className="h-fit overflow-hidden mb-96"/>

      {data && data.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:">
          <div className="py-2">
            <h2 className="text-2xl text-white font-bold leading-7  sm:truncate sm:text-3xl" id="latest-gigs">
              Latest Gigs
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 scale-x-75 scale-y-75 md:grid-cols-2 md:scale-100 xl:scale-100 xl:grid-cols-3">
            {data.map((gig) => (
              <Link
                href={`/view/${gig.id}`}
                key={gig.id}
                className="btn h-96 w-96"
              >
                <div className="card h-96 w-96 shadow-xl">
                  <figure>
                    <div
                      style={{
                        backgroundImage: `url(${gig.img})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      className="  h-96 w-96"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-start">{gig.title}</h2>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">
                        {addrShort(gig.user)}
                      </div>
                      <div className="badge badge-outline">
                        {new Date(+gig.date).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
