import React from "react";
import { Dispatch } from "./types";

export interface KeyboardContext {
  heldKeys: string[];
  setHeldKeys: Dispatch<string[]>;
}

const defaultKeyboardContext: KeyboardContext = {
  heldKeys: [],
  setHeldKeys: () => null,
};

export const { Provider: KeyboardProvider } = React.createContext<KeyboardContext>(defaultKeyboardContext);
