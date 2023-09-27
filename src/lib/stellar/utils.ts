/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  xdr,
  Transaction,
  Networks,
  Server,
  type Horizon,
  type Memo,
  type MemoType,
  type Operation,
} from "stellar-sdk";
import log from "../logger/logger";

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
