import React, { useState } from "react";
import { delay } from "./app/helper";
import { BugAntIcon } from "@heroicons/react/24/solid";
import { type SAPageProps } from "./app/interfaces";
import DevPlate from "./Dev_plate";
import Image from "next/image";
import Link from "next/link";

const SAPage = (props: SAPageProps) => {
  const [mainDev, setMainDev] = useState(false);
  const [clIsOpen, setCLIsopen] = useState(false);
  let tap = 0;

  async function tapToOpen() {
    if (tap >= 2 && !mainDev) {
      setMainDev(true);
      await delay(10000);
      tap = 0;
      setMainDev(false);
    }
    tap++;
  }

  return (
    <div className="mx-2 flex flex-col items-center tracking-wider sm:mx-5 lg:mx-10 xl:mx-10">
      <Image
        onClick={() => void tapToOpen()}
        src={props.app.logo.logoUrl}
        alt={props.app.logo.alt}
        width={150}
        height={150}
        className="rounded-full cursor-pointer hover:scale-110 hover:rotate-180 transition-all duration-700"
      />
      <div className="text-3xl font-semibold flex cursor-alias">
      <div className="hover:transform hover:-translate-y-1 hover:-translate-x-1">B</div>
      <div className="hover:transform hover:-translate-y-1 hover:translate-x-1">L</div>
      <div className="hover:transform hover:-translate-y-2 hover:-translate-x-1">O</div>
      <div className="hover:transform hover:-translate-y-2 hover:-translate-x-1">C</div>
      <div className="hover:transform hover:-translate-y-1 hover:translate-x-1">K</div>
      <div className="hover:transform hover:-translate-y-1 hover:-translate-x-1">L</div>
      <div className="hover:transform hover:-translate-y-2 hover:-translate-x-1">A</div>
      <div className="hover:transform hover:-translate-y-1 hover:translate-x-1">N</div>
      <div className="hover:transform hover:-translate-y-2 hover:-translate-x-1">C</div>
      <div className="hover:transform hover:-translate-y-1 hover:translate-x-1">E</div>
      <div className="hover:transform hover:-translate-y-2 hover:-translate-x-1">R</div>
      </div>
      <p
        onClick={() => setCLIsopen(!clIsOpen)}
        className={`${
          clIsOpen && "font-bold tracking-[0.5em]"
        } mb-4 mt-1 flex cursor-pointer space-x-2 text-center text-xs tracking-wider transition-all duration-700 hover:tracking-widest hover:text-black`}
      >
        <span className="font-semibold">{props.app.codeName}</span>
        <span>v{props.app.version}</span>
      </p>
      <div
        className={`collapse -mt-1 ${
          clIsOpen ? "collapse-open" : ""
        } w-full max-w-xl `}
      >
        <div className="collapse-content w-full max-w-xl">
          <div className="max-h-96 overflow-y-auto">
            <div className="mx-2 mb-3 mt-2 flex flex-col justify-center rounded-xl ring-2 ring-blue-500/10">
              {Object.keys(props.changeLogs)
                .slice(0, 20)
                .map((x) => (
                  <div
                    key={x}
                    className="mx-3 my-2 h-fit rounded-xl bg-slate-400/10 p-3 ring-1 ring-blue-300/40 hover:bg-blue-200/10"
                  >
                    <div className="text-sm font-semibold tracking-wider">
                      v{x}
                    </div>
                    <div className="text-xs opacity-70">
                      {new Date(props.changeLogs[x]!.date).toUTCString()}
                    </div>
                    <div className="divider my-1 py-1" />
                    <ul className="ml-4 list-disc text-sm opacity-80">
                      {props.changeLogs[x]!.changes.map((c) => (
                        <li key={c} className="hover:list-decimal">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Link
        href={props.poweredBy.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-sm transition-all duration-700 hover:tracking-widest hover:text-black">
          Powered by {props.poweredBy.companyName}
        </div>
      </Link>
      <Link
        href={props.devCompany.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mt-3 text-xs transition-all duration-700 hover:tracking-widest hover:text-black ">
          Developed by {props.devCompany.name}, {props.devCompany.year}
        </div>
      </Link>
      <div className="my-5 w-full px-5">
        <hr className="border-1 flex border-black/10" />
      </div>
      <div
        className={`${
          mainDev ? "collapse-open" : "collapse-close"
        } collapse w-full`}
      >
        <div className="collapse-content w-full">
          <div className="flex w-full justify-start px-5 text-2xl">
            Developer info
          </div>

          {props.devs.map((i) => (
            <DevPlate
              key={i.imgUrl}
              name={i.name}
              role={i.role}
              url={i.url}
              imgUrl={i.imgUrl}
              github={i.github}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 flex w-full justify-start px-5 text-2xl">
        Issue or Bug report
      </div>
      <Link
        className="w-full "
        href={props.reportUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="mt-3 flex w-full items-center justify-start overflow-hidden px-5
        transition-all duration-500 ease-in-out hover:scale-100 hover:rounded-xl hover:border-blue-400 hover:bg-slate-900/80 hover:px-4
        hover:py-3 hover:text-xl hover:font-bold hover:tracking-wider hover:text-slate-300/70 hover:backdrop-blur
        focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 active:scale-90
        "
        >
          <div className="h-16 w-16 hover:animate-ping transition-all duration-700">
            <BugAntIcon />
          </div>
          <div className="ml-3">
            <div className="text-lg font-semibold">
              Report on Github issue tab
            </div>
            <div className="text-sm">
              Before reporting any issue or bug report please add proper
              description and screenshorts to help fix the problem.
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SAPage;
