import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginWithGoogle() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <button onClick={() => void signOut()} className="btn normal-case">
        {session.user.image && (
          <div className="avatar">
            <div className="relative w-8 rounded-full">
              <Image alt={session.user.id} src={session.user.image} fill />
            </div>
          </div>
        )}
        <span>{session.user.name}</span>
      </button>
    );
  } else if (status === "loading") {
    <button className="btn">
      <span className="loading" />
    </button>;
  }

  return (
    <button
      className="btn "
      onClick={() => void signIn("google", { callbackUrl: "/" })}
    >
      <Image
        height="40"
        width="40"
        src="/images/btn_google_light_pressed_ios@3x.png"
        alt="Google"
      />
      Sign in with Google
    </button>
  );
}
