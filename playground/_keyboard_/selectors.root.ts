import { flattenOptionMap } from "./types";

export const getRootHandshapeOptions = () =>
  flattenOptionMap({
    "񆅁": { label: "first" },
    "񂱡": { label: "circle" },
    "񂰁": { label: "curlicue" },
    "񂙡": { label: "claw" },
    "񂡁": { label: "hook" },
    "񂤁": { label: "cup" },
    "񂳁": { label: "oval" },
    "񂼁": { label: "hinge" },
    "񃈁": { label: "angle" },
    "񂇡": { label: "flat" },
  });
