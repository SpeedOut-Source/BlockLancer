import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="z-50">
      <div className="mx-5 mt-auto flex items-center justify-center">
        <div className="container">
          <div className="mb-4 mt-2 flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
            <span className="text-sm "> © 2023 BlockLancer </span>
            <ul className="flex flex-wrap space-x-4 text-sm ">
              <li>
                {" "}
                <a
                  onClick={() => void router.push("/about")}
                  className="textAniHover cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a href="mailto:mail@biplobsd.me" className="textAniHover">
                  Contact Us
                </a>
              </li>
              <li>
                {" "}
                <a
                  onClick={() => void router.push("/privacy")}
                  className="textAniHover cursor-pointer"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
