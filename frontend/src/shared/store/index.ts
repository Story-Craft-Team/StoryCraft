import { create } from "zustand";

import { authSlice } from "./slices";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Store } from "@/shared/lib/types";
import { storyEditorSlice } from "./slices/storyEditor";

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...authSlice(...a),
        ...storyEditorSlice(...a),
      }))
    )
  )
);