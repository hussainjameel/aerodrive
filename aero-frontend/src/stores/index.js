import { create } from "zustand";
import { createDockSlice} from "./slices/dock";
import { createSystemSlice } from "./slices/system";

export const useStore = create((...a) => ({
  ...createDockSlice(...a),
  ...createSystemSlice(...a)
}));
