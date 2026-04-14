import { create } from 'zustand';

type TreinoStore = {
    treinoId?: string;
    setTreinoId: (id?: string) => void;
}

export const useTreinoStore = create<TreinoStore>((set) => ({
  treinoId: undefined,
  setTreinoId: (id) => set({ treinoId: id }),
}));