import { create } from "zustand";

interface WCI {
  isOpen: boolean;
  setIsOpen: (mode: boolean) => void;
}

export const useWCIStore = create<WCI>((set) => ({
  isOpen: false,
  setIsOpen: (mode: boolean) => set({ isOpen: mode }),
}));
