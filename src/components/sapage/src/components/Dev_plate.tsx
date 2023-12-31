import React from "react";
import { type DevPlateProps } from "./app/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function DevPlate(props: DevPlateProps) {
  return (
    <>
      <div className="my-2 rounded-xl hover:tracking-widest bg-violet-950 bg-opacity-25 py-1 hover:bg-violet-600 hover:backdrop-blur">
        <div className="hover:acc-bt tsd flex items-center justify-start">
          
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <div className="relative ml-5 h-16 w-16 overflow-hidden rounded-full border">
            <Image
              src={props.imgUrl}
              alt={`${props.name} profile picture`}
              objectFit="cover"
              layout="fill"
            />
          </div>

      </a>
        <div className="flex flex-row items-center">
      <a href={props.url} target="_blank" rel="noopener noreferrer">
          <div className="ml-3 bg-slate-300 bg-clip-text text-transparent">
            <div className="text-lg font-bold">{props.name}</div>
            <div className="text-sm font-medium">{props.role}</div>
          </div>
        </a>
          <div className="ml-3 hidden md:flex">
          <a href={props.github} target="_blank" rel="noopener noreferrer">
              <Image
              src="/images/github.png"
              alt={`github profile`}
              width={50}
              height={50}
              className="opacity-50 hover:opacity-100 border-2 rounded-full border-slate-300 hover:border-slate-900"
            />
            </a>
 

          </div>
        </div>

        </div>
      </div>
    </>
  );
}
