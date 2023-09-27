import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

import axios from "axios";
import toast from "react-hot-toast";

import { z } from "zod";
import { WalletType } from "~/lib/enums";
import { auth } from "~/lib/firebase/firebase-auth";
import { type ConnectWalletStateModel } from "~/lib/states/connect_wallet_state";
import { addrShort } from "~/lib/utils";
import { env } from "~/env.mjs";

export async function facebookLogin(walletState: ConnectWalletStateModel) {
  const provider = new FacebookAuthProvider();
  provider.addScope("email");
  provider.setCustomParameters({
    display: "popup",
  });

  try {
    const user = (await signInWithPopup(auth, provider)).user;
    const { uid } = user;
    const { email } = user.providerData[0]!;

    await auth.signOut();
    const res = await toast.promise(
      axios.get(env.NEXT_PUBLIC_STELLAR_ACCOUNT_URL, {
        params: {
          uid,
          email,
        },
      }),
      {
        loading: "Getting public key...",
        success: "Received public key",
        error: "Unable to get public key",
      },
    );

    const publicKeySchema = z.object({
      publicKey: z.string().min(56),
    });

    const { publicKey } = await publicKeySchema.parseAsync(res.data);

    walletState.setUserData(publicKey, true, WalletType.facebook);
    toast.success("Public Key : " + addrShort(publicKey, 10));
  } catch (error) {
    console.error(error);
  }
}
