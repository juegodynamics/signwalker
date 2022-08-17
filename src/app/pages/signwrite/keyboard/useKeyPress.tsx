// import React from "react";
// import { Dispatch } from "./types";

// export const useKeyPress = <T, E = T>({
//   setState,
//   nextStateFromKey,
//   updatePriorState,
//   releasePriorState,
// }: {
//   setState: Dispatch<T>;
//   nextStateFromKey: (key: string) => E | undefined;
//   updatePriorState: (prior: T, next: E) => T;
//   releasePriorState?: (prior: T, next: E) => T;
// }) => {
//   const handleKeyPress = React.useCallback(
//     ({ key }: { key: string }) => {
//       const nextState = nextStateFromKey(key);
//       if (nextState) {
//         setState((priorState) => updatePriorState(priorState, nextState));
//       }
//     },
//     [setState, nextStateFromKey]
//   );

//   const handleKeyUp = React.useCallback(
//     ({ key }: { key: string }) => {
//       const nextState = nextStateFromKey(key);
//       if (nextState && releasePriorState) {
//         setState((priorState) => releasePriorState(priorState, nextState));
//       }
//     },
//     [setState, nextStateFromKey]
//   );

//   React.useEffect(() => {
//     window.addEventListener("keydown", handleKeyPress);
//     if (releasePriorState) window.addEventListener("keyup", handleKeyUp);
//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//       if (releasePriorState) window.addEventListener("keyup", handleKeyUp);
//     };
//   }, [nextStateFromKey]);
// };
export {};
