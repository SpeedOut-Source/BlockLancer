import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useDialogStore } from "~/lib/states/connect_wallet_dialog";
import { useConnectWalletStateStore } from "~/lib/states/connect_wallet_state";
import { addrShort } from "~/lib/utils";

export default function ConnectWalletButton() {
  const walletState = useConnectWalletStateStore();
  const [isWalletAva, setIsWalletAva] = useState(false);
  useEffect(() => {
    setIsWalletAva(walletState.isAva);
  }, [walletState.isAva]);

  const setDialog = useDialogStore();
  return (
    <div className="flex items-center gap-2">
      {isWalletAva && (
        <Link href="/create" className="btn glass text-black font-extrabold hover:text-white">
          <PlusIcon className="h-5 w-5" />
          <span>Create</span>
        </Link>
      )}
      <button onClick={() => setDialog.setIsOpen(true)}>
        <div className="tsd flex items-center justify-center rounded-xl border border-slate-50/10 bg-slate-100/70 px-4 py-2 text-sm font-bold tracking-wider text-gray-700 backdrop-blur hover:scale-95 hover:border-blue-800 hover:bg-blue-800 hover:text-blue-100 focus:border-blue-700 active:ring-blue-500 ">
          <div className="relative mr-2 h-6 w-6">
            <Image
              alt="BlockLancer Logo"
              layout="fill"
              objectFit="cover"
              src="/favicon.ico"
            />
          </div>
          <span>
            {isWalletAva ? addrShort(walletState.pubkey) : "Connect Wallet"}
          </span>
        </div>
      </button>
    </div>
  );
}
