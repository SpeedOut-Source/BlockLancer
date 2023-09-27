import toast from "react-hot-toast";
import freighter, { signTransaction } from "@stellar/freighter-api";

import log from "../../logger/logger";
import { WalletType } from "~/lib/enums";
import { type ConnectWalletStateModel } from "~/lib/states/connect_wallet_state";
import { checkPubkey, addrShort } from "~/lib/utils";
import { submitSignedXDRToServer } from "../utils";

export async function freighterLogin(walletState: ConnectWalletStateModel) {
  let pubkey: string;
  const freighterConnected = await freighter.isConnected();
  if (!freighterConnected) {
    toast.error(
      "Freighter extension is not installed. Install Freighter and try again",
    );
    return;
  }
  try {
    pubkey = await freighter.getPublicKey();
  } catch (e) {
    toast.error("While getting pubkey raise unexpected error");
    return;
  }

  if (checkPubkey(pubkey)) {
    toast.error("While getting pubkey raise unexpected error");
    return;
  }
  walletState.setUserData(pubkey, true, WalletType.frieghter);
  toast.success("Public Key : " + addrShort(pubkey, 10));
}

export const userSignTransaction = async (xdr: string, signWith: string) => {
  let signedTransaction = "";
  let error: unknown;

  try {
    signedTransaction = await signTransaction(xdr, {
      network: "PUBLIC",
      accountToSign: signWith,
    });
  } catch (e) {
    error = e;
  }

  if (error) {
    log.error("freighter: ", error);
    return;
  }

  return signedTransaction;
};

export const freighterSignTrx = async (xdr: string, signWith: string) => {

  try {
    const signedXDR = await signTransaction(xdr, {
      network: "PUBLIC",
      accountToSign: signWith,
    });
    const res = await submitSignedXDRToServer(signedXDR);
    return res.successful;
  } catch (e) {
    log.info("freighter error", e);
    return false;
  }
};
