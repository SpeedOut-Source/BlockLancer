import { useEffect, useState } from "react";
import IconButton from "./icon_button";

import { toast } from "react-hot-toast";
import { setCookie } from "cookies-next";

import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
  SignalSlashIcon,
} from "@heroicons/react/24/solid";

import CopyToClipboard from "react-copy-to-clipboard";
import { WalletType } from "~/lib/enums";
import { checkStellarAccountActivity } from "~/lib/helper/helper_client";
import { useDialogStore } from "~/lib/states/connect_wallet_dialog";
import { useConnectWalletStateStore } from "~/lib/states/connect_wallet_state";
import { useWCIStore } from "~/lib/states/wallect_connect_import";
import { albedoLogin } from "~/lib/stellar/wallet_clients/albedo_login";
import { facebookLogin } from "~/lib/stellar/wallet_clients/facebook_login";
import { freighterLogin } from "~/lib/stellar/wallet_clients/freighter_login";
import { googleLogin } from "~/lib/stellar/wallet_clients/google_login";
import { rabetLogin } from "~/lib/stellar/wallet_clients/rabe_login";
import {
  configureSignClient,
  walletConnectLogin,
} from "~/lib/stellar/wallet_clients/wallet_connect";
import { addrShort } from "~/lib/utils";
import log from "~/lib/logger/logger";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogContent } from "../ui/dialog";

interface ConnectDialogProps {
  className: string;
}

export default function ConnectDialog({ className }: ConnectDialogProps) {
  const [initializing, setInitializing] = useState(true);
  const [wcLoading, setWcLoading] = useState(false);
  const [isAccountActivate, setAccountActivate] = useState(false);
  const [isAccountActivateLoading, setAccountActivateLoading] = useState(false);
  const state = useDialogStore();
  const walletState = useConnectWalletStateStore();
  const wciStore = useWCIStore();

  useEffect(() => {
    void checkStatus();
  }, [walletState.pubkey]);

  const checkStatus = async () => {
    if (walletState.isAva) {
      await checkAccountActivity(walletState.pubkey);
    }
  };

  async function checkAccountActivity(publicKey: string) {
    setAccountActivateLoading(true);
    setAccountActivate(await checkStellarAccountActivity(publicKey));
    setAccountActivateLoading(false);
  }

  async function onInitialize() {
    try {
      await configureSignClient();
      setInitializing(false);
    } catch (e) {
      log.error(e);
    }
  }

  function closeModal() {
    state.setIsOpen(false);
  }

  function disconnectWallet() {
    walletState.removeUserDat();
  }

  useEffect(() => {
    if (walletState.isAva && walletState.pubkey !== "") {
      setCookie("pubkey", walletState.pubkey, {
        sameSite: true,
      });
    }
  }, [walletState.isAva]);

  function toolTipsAddr(walletType: WalletType) {
    return walletState.isAva && walletState.walletType == walletType
      ? addrShort(walletState.pubkey, 10)
      : undefined;
  }

  return (
    <Dialog open={state.isOpen} onOpenChange={closeModal}>
      <DialogContent
        className={twMerge(
          "scrollbar-style !m-0 max-h-screen overflow-y-auto !rounded-xl !p-3 ",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          {walletState.isAva ? (
            <div className="flex items-center gap-2 ">
              <span
                className="tooltip tooltip-right"
                data-tip="Disconnect wallet"
              >
                <SignalSlashIcon
                  onClick={disconnectWallet}
                  className="aac-sbt h-5 w-5 cursor-pointer "
                />
              </span>
            </div>
          ) : (
            <div />
          )}
          {walletState.isAva ? (
            <div className="flex items-center gap-2 ">
              {isAccountActivateLoading ? (
                <span
                  data-tip="Checking is account activated or not"
                  className="tooltip tooltip-bottom "
                >
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                <></>
              )}
              <CopyToClipboard
                text={walletState.pubkey}
                onCopy={() =>
                  toast.success("Copied: " + addrShort(walletState.pubkey))
                }
              >
                <span className="flex cursor-pointer items-center gap-2 font-semibold hover:bg-slate-300/10">
                  {addrShort(walletState.pubkey, 10)}{" "}
                  <span
                    data-tip="Copy address"
                    className="tooltip tooltip-right"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4 " />
                  </span>
                </span>
              </CopyToClipboard>
            </div>
          ) : (
            <div />
          )}

          <div />
        </div>

        <div className="relative">
          {!isAccountActivate && walletState.isAva ? (
            <div className="absolute h-full w-full ">
              <div className="m-4 -mt-2 flex h-full flex-col items-center justify-center gap-3  text-center ">
                <p className="mb-4 text-xl font-bold">
                  Account is not activated
                </p>
                <p>
                  We generated this address for you. Please fund it to use it in
                  future. Keep in mind that you’ll need to deposit 3 XLM
                  (minimum) to use this account/address. Stellar locks 2 XLM as
                  reserve. Every asset you claim/hold will consume 0.5 XLM each.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <CopyToClipboard
                    text={walletState.pubkey}
                    onCopy={() =>
                      toast.success("Copied: " + addrShort(walletState.pubkey))
                    }
                  >
                    <button className=" acc-bt flex items-center gap-2 bg-[#EA9168]/70 hover:bg-[#EB672A]/90">
                      <DocumentDuplicateIcon className="h-4 w-4 " />
                      Copy address
                    </button>
                  </CopyToClipboard>
                  <button
                    disabled={isAccountActivateLoading}
                    onClick={() => void checkStatus()}
                    className="acc-bt flex justify-center bg-[#AEED7C]/70 hover:bg-[#76EB1A]/90 hover:text-slate-100/90"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div
            className={
              !isAccountActivate && walletState.isAva ? "invisible" : ""
            }
          >
            <h3 className="mb-3 mt-4 flex justify-between text-lg font-medium leading-6 tracking-wider">
              <span>Select Wallet</span>
            </h3>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <IconButton
                toolTips={toolTipsAddr(WalletType.facebook)}
                isSelected={walletState.walletType == WalletType.facebook}
                onClick={() => void facebookLogin(walletState)}
                imageUrl="/images/wallets/facebook.png"
                text="Facebook"
              />
              <IconButton
                toolTips={toolTipsAddr(WalletType.google)}
                isSelected={walletState.walletType == WalletType.google}
                onClick={() => void googleLogin(walletState)}
                imageUrl="/images/wallets/google.png"
                text="Google"
              />
              <IconButton
                toolTips={toolTipsAddr(WalletType.albedo)}
                isSelected={walletState.walletType == WalletType.albedo}
                onClick={() => {
                  return void albedoLogin(walletState);
                }}
                imageUrl="/images/wallets/albedo.svg"
                text="Albedo"
              />
              <IconButton
                disable={wcLoading}
                toolTips={toolTipsAddr(WalletType.walletConnect)}
                isSelected={walletState.walletType == WalletType.walletConnect}
                onClick={() => {
                  const runner = async () => {
                    setWcLoading(true);
                    if (initializing) {
                      await import("@web3modal/ui");
                      await onInitialize();
                    }
                    setWcLoading(false);
                    wciStore.setIsOpen(true);
                    await walletConnectLogin(walletState);
                    wciStore.setIsOpen(false);

                    toast("WalletConnect session ended");
                  };
                  void runner();
                }}
                imageUrl="/images/wallets/walletconnect.png"
                text={
                  initializing && wcLoading
                    ? "Initializing..."
                    : "WalletConnect"
                }
              />
              <IconButton
                toolTips={toolTipsAddr(WalletType.frieghter)}
                isSelected={walletState.walletType == WalletType.frieghter}
                onClick={() => {
                  return void freighterLogin(walletState);
                }}
                imageUrl="/images/wallets/freighter.png"
                text="Freighter"
              />

              <IconButton
                toolTips={toolTipsAddr(WalletType.rabet)}
                isSelected={walletState.walletType == WalletType.rabet}
                onClick={() => {
                  return void rabetLogin(walletState);
                }}
                imageUrl="/images/wallets/rabet.png"
                text="Rabet"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          Do not close this window or tap outside during this process.
        </div>
      </DialogContent>
    </Dialog>
  );
}
