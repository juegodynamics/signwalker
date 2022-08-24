import { Finger, FingerMap } from "./types";

export const toggleFingerInMap = (fingerMap: FingerMap, finger: Finger): FingerMap =>
  Finger.reduce((nextFinger) => (nextFinger === finger ? !fingerMap[nextFinger] : fingerMap[nextFinger]));
