import { create } from "zustand";

interface DrawerOpenType {
  isOpen: boolean;
  setIsOpen: (mode: boolean) => void;
}

export const useDrawerOpenStore = create<DrawerOpenType>((set) => ({
  isOpen: false,
  setIsOpen: (mode: boolean) => set({ isOpen: mode }),
}));
