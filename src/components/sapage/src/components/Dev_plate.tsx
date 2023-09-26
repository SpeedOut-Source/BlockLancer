import React from "react";
import { type DevPlateProps } from "./app/interfaces";
import Image from "next/image";

export default function DevPlate(props: DevPlateProps) {
  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <div className="hover:acc-bt tsd mt-3 flex items-center justify-start">
        <div className="relative ml-5 h-16 w-16 overflow-hidden rounded-full border">
          <Image
            src={props.imgUrl}
            alt={`${props.name} profile picture`}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="ml-3">
          <div className="text-lg font-semibold">{props.name}</div>
          <div className="text-sm">{props.role}</div>
        </div>
      </div>
    </a>
  );
}
