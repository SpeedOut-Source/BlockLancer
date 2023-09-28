import Head from "next/head";
import changeLogJson from "../../changelog.json";
import packageJson from "../../package.json";
import { env } from "~/env.mjs";
import SAPage from "../components/sapage/src/components/SAPage";

export default function About() {
  return (
    <>
      <Head>
        <title>About | BlockLancer</title>
        <meta name="description" content={env.NEXT_PUBLIC_DESC} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-5 ">
        <SAPage
          app={{
            title: "BlockLancer",
            codeName: packageJson.name,
            logo: {
              logoUrl: "/logo.png",
              alt: "BlockLancer logo",
            },
            version: packageJson.version,
          }}
          devCompany={{
            name: "SpeedOut",
            url: "https://play.google.com/store/apps/dev?id=7013622463085625240",
            year: 2023,
          }}
          devs={[
            {
              name: "Biplob Kumar Sutradhar",
              imgUrl: "https://avatars.githubusercontent.com/u/43641536",
              role: "Lead Developer",
              url: "https://biplobsd.me",
              github: "https://github.com/biplobsd",
            },
            {
              name: "Arnob Dey",
              imgUrl: "https://avatars.githubusercontent.com/u/74468064",
              role: "Developer",
              url: "https://www.arnob.social/",
              github: "https://github.com/arnob016",
            },
            {
              name: "Md. Mehedi Hasan",
              imgUrl: "https://avatars.githubusercontent.com/u/124759758",
              role: "Developer",
              url: "https://github.com/71mehedi",
              github: "https://github.com/71mehedi",
            },
          ]}
          reportUrl="https://github.com/SpeedOut-Source/BlockLancer/issues"
          poweredBy={{
            companyName: "SpeedOut",
            url: "https://play.google.com/store/apps/dev?id=7013622463085625240",
          }}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          changeLogs={changeLogJson}
        />
      </main>
    </>
  );
}
