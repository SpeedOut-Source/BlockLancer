import Head from "next/head";
import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Router from "next/router";
import toast from "react-hot-toast";
import { useConnectWalletStateStore } from "~/lib/states/connect_wallet_state";
import { addrShort } from "~/lib/utils";

export default function Login() {
  const walletState = useConnectWalletStateStore();
  const [isWalletAva, setIsWalletAva] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { status } = useSession();
  const [islogin, setIslogin] = useState(-1);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsWalletAva(walletState.isAva);
  }, [walletState.isAva]);

  async function switchAuthModeHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsloading(true);
    const res = await toast.promise(
      signIn("credentials", {
        pubKey: walletState.pubkey,
        password: passwordRef.current?.value,
        redirect: false,
      }),
      {
        loading: "Login...",
        success: (data) => (data && data.ok ? `Login success` : "Login failed"),
        error: <b>Login Failed</b>,
      },
      {
        success: {
          icon: "🔒",
        },
      },
    );
    if (res && res.ok) {
      setIslogin(1);
      await Router.replace("/");
    } else {
      setIslogin(0);
    }
    setIsloading(false);
  }

  function getLoginState() {
    if (!isWalletAva) {
      return (
        <>
          {" "}
          <InformationCircleIcon className="mr-1 h-6 w-6 text-gray-300" />
          Please connect your wallet first
        </>
      );
    } else if (islogin === 1) {
      return (
        <>
          {" "}
          <CheckCircleIcon className="mr-1 h-6 w-6 text-green-300" />
          Login success
        </>
      );
    } else if (islogin === 0) {
      return (
        <>
          {" "}
          <NoSymbolIcon className="mr-1 h-6 w-6 text-red-300" />
          Login failed
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div>
      <Head>
        <title>Login | BlockLancer</title>
        <meta name="description" content="BlockLancer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center lg:ml-16 xl:ml-16">
        <div className="mt-10 flex items-center justify-center">
          {status === "authenticated" ? (
            <button onClick={() => void signOut()} className="btn">
              Logout
            </button>
          ) : (
            <div className="z-20 rounded-2xl bg-white px-12 py-12 shadow-xl">
              <div>
                <h1 className="mb-4 text-center text-3xl font-bold">
                  Admin login
                </h1>
                <p className="w-80 text-center text-sm font-semibold tracking-wide text-gray-700">
                  First connect your wallet. It will get your public key as user
                  id.
                </p>
              </div>
              <div className="flex h-10 items-center justify-center">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  {getLoginState()}
                </div>
              </div>
              <form onSubmit={(e) => void switchAuthModeHandler(e)}>
                <div className="space-y-4">
                  <span className="block w-full rounded-lg border px-4 py-3 text-sm text-gray-300 outline-none">
                    {isWalletAva ? addrShort(walletState.pubkey, 15) : ""}
                  </span>
                  <input
                    disabled={!isWalletAva}
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    className="block w-full rounded-lg border px-4 py-3 text-sm text-gray-300 outline-none"
                    required
                  />
                </div>
                <div
                  className={`mt-6 text-center  ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                >
                  <button className="btn" disabled={!isWalletAva || isLoading}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
