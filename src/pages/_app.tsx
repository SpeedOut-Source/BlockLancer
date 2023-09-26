import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <main className="flex min-h-screen flex-col justify-between">
          <div className="flex min-h-full flex-col">
            <Navbar />
            <Component {...pageProps} />
          </div>
          <Footer />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;
