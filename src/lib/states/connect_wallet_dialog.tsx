import { create } from "zustand";
interface DialogModel {
  isOpen: boolean;
  aKeyOpen?: boolean;
  setIsOpen: (mode: boolean, akey?: boolean) => void;
}

export const useDialogStore = create<DialogModel>((set) => ({
  isOpen: false,
  aKeyOpen: false,
  setIsOpen: (mode: boolean, akey?: boolean) =>
    set({ isOpen: mode, aKeyOpen: akey ?? false }),
}));
