/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Keypair,
  xdr,
  Transaction,
  Networks,
  Server,
  type Horizon,
  type Memo,
  type MemoType,
  Operation,
  TransactionBuilder,
} from "stellar-sdk";
import log from "../logger/logger";
import { albedoSignTrx } from "./wallet_clients/albedo_login";

export async function transactionCreate(buyerAddr: string) {
  const server = new Server("https://horizon-testnet.stellar.org");

  // Issuer Account
  const issuerAcc = Keypair.random();

  // TODO: have store this in firebase.
  log.info("issuer acc: ", issuerAcc.publicKey(), issuerAcc.secret());
  const fee = "100000";

  const transactionInitializer = await server.loadAccount(buyerAddr);
  const transaction = new TransactionBuilder(transactionInitializer, {
    fee: fee,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.createAccount({
        destination: issuerAcc.publicKey(),
        startingBalance: "40",
        source: buyerAddr,
      }),
    )
    .setTimeout(0)
    .build();

  const trxId = transaction.toEnvelope().toXDR("base64");
  await albedoSignTrx(trxId, buyerAddr, "testnet");
  return { trxId, issuerAcc };
}

export const recursiveTransactionSubmitter = async (
  transaction: Transaction<Memo<MemoType>, Operation[]>,
): Promise<Horizon.SubmitTransactionResponse> => {
  let result: Horizon.SubmitTransactionResponse;
  try {
    const server = new Server("https://horizon.stellar.org");

    result = await server.submitTransaction(transaction);
    return result;
  } catch (error: any) {
    log.info(error);
    if (error.response) {
      log.info(error.response.data.extras);
      if (error.response.status === 504) {
        return recursiveTransactionSubmitter(transaction);
      } else if (error.response.status === 400) {
        log.info(error);
        throw "bad seq happened";
      }
    }

    throw "other error happens";
  }
};

export async function submitSignedXDRToServer(signed_xdr: string) {
  const envelop = xdr.TransactionEnvelope.fromXDR(signed_xdr, "base64");
  const transaction = new Transaction(envelop, Networks.PUBLIC);
  const res = await recursiveTransactionSubmitter(transaction);
  return res;
}
