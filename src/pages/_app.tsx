import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="flex h-screen flex-col justify-between">
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
};

export default MyApp;
