/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { xBullWalletConnect } from "@creit-tech/xbull-wallet-connect";
import toast from "react-hot-toast";

import log from "../../logger/logger";
import { WalletType } from "~/lib/enums";
import type { ConnectWalletStateModel } from "~/lib/states/connect_wallet_state";
import { checkPubkey, addrShort } from "~/lib/utils";
import { submitSignedXDRToServer } from "../utils";

export async function xbullLogin(walletState: ConnectWalletStateModel) {
  let pubkey: string;
  try {
    const bridge = new xBullWalletConnect({ preferredTarget: "extension" });
    pubkey = await bridge.connect();
    log.info(pubkey, "xbull Pub key");
    log.info(pubkey, "xbull Pub key");
    bridge.closeConnections();
  } catch (e) {
    toast.error(
      "While getting pubkey raise unexpected error: maybe xbullLogin extension is not installed. Install xbullLogin and try again",
    );
    return;
  }

  if (checkPubkey(pubkey)) {
    toast.error("While getting pubkey raise unexpected error");
    return;
  }
  walletState.setUserData(pubkey, true, WalletType.xBull);
  toast.success("Public Key : " + addrShort(pubkey, 10));
}

export async function xbullSignXdr(xdr: string, publicKey: string) {
  const network =
    process.env.NEXT_PUBLIC_NETWORK === "0" ? "TESTNET" : "public";
  let bridge: xBullWalletConnect;
  try {
    bridge = new xBullWalletConnect({ preferredTarget: "extension" });
    const signedXDR = await bridge.sign({
      xdr: xdr,
      publicKey: publicKey,
      network: network,
    });
    bridge.closeConnections();
    return signedXDR;
  } catch (e) {
    log.error(e);
    return false;
  }
}

export async function xbullXdrSingXdrAndSubmit(xdr: string, publicKey: string) {
  const network =
    process.env.NEXT_PUBLIC_NETWORK === "0" ? "TESTNET" : "public";
  let bridge: xBullWalletConnect;
  try {
    bridge = new xBullWalletConnect({ preferredTarget: "extension" });
    const signedXDR: string = await bridge.sign({
      xdr: xdr,
      publicKey: publicKey,
      network: network,
    });
    const res = await submitSignedXDRToServer(signedXDR);
    bridge.closeConnections();
    return res.successful;
  } catch (e) {
    return false;
  }
}
