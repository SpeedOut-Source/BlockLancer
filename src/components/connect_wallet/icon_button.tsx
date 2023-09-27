/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import type { MouseEventHandler } from "react";

interface IconButtonProps {
  text: string;
  imageUrl?: string;
  icon?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  justify?: string;
  isSelected?: boolean;
  toolTips?: string;
  disable?: boolean;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <div
      data-tip={props.toolTips}
      className={props.toolTips ? "tooltip w-full" : ""}
    >
      <button
        disabled={props.disable}
        onClick={props.onClick}
        className={`${
          props.isSelected
            ? "bg-green-200/50 ring-2 ring-green-500/90"
            : "bg-slate-100/60 "
        }  w-full ${props.disable ? "" : "hover:rounded-3xl"} 
    tsd tsd flex overflow-hidden rounded-xl border border-slate-50/25
    px-4 py-3 text-xl font-bold tracking-wider text-slate-800/80 backdrop-blur-3xl focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300
        active:scale-90 ${props.justify ?? "justify-center"} items-center 
        ${
          props.disable
            ? "opacity-70"
            : "hover:border-blue-400 hover:bg-blue-100 hover:text-blue-500/80"
        }`}
      >
        {props.imageUrl ? (
          <Image
            className="rounded-full"
            height="40"
            width="40"
            src={props.imageUrl}
            alt={props.text}
          />
        ) : (
          props.icon
        )}
        <span className="ml-2">{props.text}</span>
      </button>
    </div>
  );
}
