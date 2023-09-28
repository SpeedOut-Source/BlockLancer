import React from "react";
import { type DevPlateProps } from "./app/interfaces";
import Image from "next/image";

export default function DevPlate(props: DevPlateProps) {
  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <div className="my-2 rounded-xl bg-violet-950 bg-opacity-25 py-1 hover:bg-violet-600 hover:backdrop-blur">
        <div className="hover:acc-bt tsd flex items-center justify-start">
          <div className="relative ml-5 h-16 w-16 overflow-hidden rounded-full border">
            <Image
              src={props.imgUrl}
              alt={`${props.name} profile picture`}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <div className="ml-3 bg-slate-300 bg-clip-text text-transparent">
            <div className="text-lg font-bold">{props.name}</div>
            <div className="text-sm font-medium">{props.role}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
