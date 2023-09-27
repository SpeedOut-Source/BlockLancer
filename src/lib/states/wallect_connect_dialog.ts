import { create } from "zustand";

export interface WallectConnectModel {
  isOpen: boolean;
  ws: string;
  setIsOpen: (mode: boolean, ws: string) => void;
}

export const useWallectConnectStore = create<WallectConnectModel>((set) => ({
  isOpen: false,
  ws: "",
  setIsOpen: (mode: boolean, ws: string) => set({ isOpen: mode, ws: ws }),
}));
