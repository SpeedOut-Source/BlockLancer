/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import toast from "react-hot-toast";
import { WalletType } from "~/lib/enums";
import { type ConnectWalletStateModel } from "~/lib/states/connect_wallet_state";
import { checkPubkey, addrShort } from "~/lib/utils";
import { submitSignedXDRToServer } from "../utils";
import log from "~/lib/logger/logger";

interface ConnectResult {
  publicKey: string;
  error?: string;
}

export async function rabetLogin(walletState: ConnectWalletStateModel) {
  let pubkey: string;
  const rabet = (window as any).rabet;

  if (!rabet) {
    toast.error(
      "Rabet extension is not installed. Install Rabet and try again",
    );
    return;
  }

  try {
    let result = await (rabet.connect() as Promise<ConnectResult>);
    pubkey = result.publicKey;
    await (rabet.disconnect() as Promise<void>);
  } catch (e: any) {
    toast.error(e.error);
    return;
  }

  if (checkPubkey(pubkey)) {
    toast.error("While getting pubkey raise unexpected error");
    return;
  }
  walletState.setUserData(pubkey, true, WalletType.rabet);
  toast.success("Public Key : " + addrShort(pubkey, 10));
}

export async function rabetXdrSingXdr(xdr: string, pubKey: string) {
  log.info(pubKey);
  const network = "mainnet";

  let rabet: any;
  if (!(window as any).rabet) {
    toast.error(
      "Rabet extension is not installed. Install Rabet and try again",
    );
    return undefined;
  } else {
    rabet = (window as any).rabet;
  }

  await (rabet.connect() as Promise<ConnectResult>);
  let signed_xdr: string | undefined;
  await rabet
    .sign(xdr, network)
    .then(function (result: SignResult) {
      signed_xdr = result.xdr;
    })
    .catch(function (error: any) {
      console.error(`Error: ${error.message}`);
      return undefined;
    });

  await (rabet.disconnect() as Promise<void>);
  return signed_xdr;
}

export async function rabetXdrSingXdrAndSubmit(xdr: string, pubKey: string) {
  // const network = "mainnet" // mainnet / testnet
  const signed_xdr = await rabetXdrSingXdr(xdr, pubKey);

  if (signed_xdr) {
    const res = await submitSignedXDRToServer(signed_xdr);
    return res.successful;
  }

  return false;
}

interface SignResult {
  xdr: string;
  error: string;
}
