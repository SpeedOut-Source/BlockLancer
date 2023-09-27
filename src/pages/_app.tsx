import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import dynamic from "next/dynamic";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { Titillium_Web } from "next/font/google";

import "~/styles/globals.css";

const PopupImports = dynamic(() => import("~/components/popup_imports"));

const inner = Titillium_Web({ subsets: ["latin"], weight: "400" });

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
        <main
          className={
            "relative flex min-h-screen flex-col justify-between bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 before:pointer-events-none before:absolute before:inset-0 before:block before:h-full before:w-full before:bg-[url('/images/background-pattern.svg')] before:bg-cover before:bg-no-repeat before:opacity-5 " +
            +inner.className
          }
        >
          <div className="flex min-h-full flex-col">
            <Navbar />
            <Component {...pageProps} />
          </div>
          <Footer />
        </main>
        <PopupImports className={inner.className} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;
