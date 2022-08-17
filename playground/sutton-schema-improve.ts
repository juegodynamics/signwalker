enum RootHandShape {
  FIST = "񆄡",
  CIRCLE = "񂱁",
  CURLICUE = "񂯡",
  CLAW = "񂙁",
  HOOK = "񂠡",
  CUP = "񂣡",
  OVAL = "񂲡",
  HINGE = "񂻡",
  ANGLE = "񃇡",
  FLAT = "񂇁",
}

enum FingerShape {
  UP = "UP",
}

const fingerUp = () => ({
  fingerShape: FingerShape.UP,
});

interface HandShape {
  // id: number;
  symbol?: string;
  rootShape: RootHandShape;
  thumb?: {
    fingerShape: FingerShape;
  };
  index?: {
    fingerShape: FingerShape;
  };
  middle?: {
    fingerShape: FingerShape;
  };
  ring?: {
    fingerShape: FingerShape;
  };
  little?: {
    fingerShape: FingerShape;
  };
}

const fistShapes: HandShape[] = [
  { symbol: "񆄡", rootShape: RootHandShape.FIST },
  { symbol: "񃛁", rootShape: RootHandShape.FIST, little: { fingerShape: FingerShape.UP } },
  { symbol: "񄅁", rootShape: RootHandShape.FIST, ring: { fingerShape: FingerShape.UP } },
  {
    symbol: "񄈁",
    rootShape: RootHandShape.FIST,
    ring: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  { symbol: "񄩁", rootShape: RootHandShape.FIST, middle: { fingerShape: FingerShape.UP } },
  {
    symbol: "񄲁",
    rootShape: RootHandShape.FIST,
    middle: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񄎁",
    rootShape: RootHandShape.FIST,
    middle: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񄳡",
    rootShape: RootHandShape.FIST,
    middle: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  { symbol: "񀀁", rootShape: RootHandShape.FIST, index: { fingerShape: FingerShape.UP } },
  {
    symbol: "񃰁",
    rootShape: RootHandShape.FIST,
    index: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񄒡",
    rootShape: RootHandShape.FIST,
    index: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񄗁",
    rootShape: RootHandShape.FIST,
    index: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񀕁",
    rootShape: RootHandShape.FIST,
    index: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񃶁",
    rootShape: RootHandShape.FIST,
    index: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񃉁",
    rootShape: RootHandShape.FIST,
    index: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񁦁",
    rootShape: RootHandShape.FLAT,
    index: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  { symbol: "񅯡", rootShape: RootHandShape.FIST, thumb: { fingerShape: FingerShape.UP } },
  {
    symbol: "񃧁",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񄔁",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
  },
  // {
  //   symbol:"񄔁",
  //   rootShape: RootHandShape.FIST,
  //   thumb: { fingerShape: FingerShape.UP },
  //   ring: { fingerShape: FingerShape.UP },
  //   little: { fingerShape: FingerShape.UP },
  // },
  {
    symbol: "񄭡",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񄰡",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  // {
  //   symbol:"",
  //   rootShape: RootHandShape.FIST,
  //   thumb: { fingerShape: FingerShape.UP },
  //   middle: { fingerShape: FingerShape.UP },
  //   ring: { fingerShape: FingerShape.UP },
  // },
  // {
  //   symbol: "",
  //   rootShape: RootHandShape.FIST,
  //   thumb: { fingerShape: FingerShape.UP },
  //   middle: { fingerShape: FingerShape.UP },
  //   ring: { fingerShape: FingerShape.UP },
  //   little: { fingerShape: FingerShape.UP },
  // },
  {
    symbol: "񅊁",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    index: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񃪁",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    index: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  // {
  //   rootShape: RootHandShape.FIST,
  //   thumb: { fingerShape: FingerShape.UP },
  //   index: { fingerShape: FingerShape.UP },
  //   ring: { fingerShape: FingerShape.UP },
  // },
  {
    symbol: "񄦁",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    index: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񀭁",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    index: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񄀡",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    index: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񃕁",
    rootShape: RootHandShape.FIST,
    thumb: { fingerShape: FingerShape.UP },
    index: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
  },
  {
    symbol: "񁲁",
    rootShape: RootHandShape.FLAT,
    thumb: { fingerShape: FingerShape.UP },
    index: { fingerShape: FingerShape.UP },
    middle: { fingerShape: FingerShape.UP },
    ring: { fingerShape: FingerShape.UP },
    little: { fingerShape: FingerShape.UP },
  },
];

const getCombinations = (): HandShape[] => {
  const shapes: HandShape[] = [];
  for (let bindex = 0; bindex.toString(2).length <= 5; bindex++) {
    const bstrindex = bindex.toString(2).padStart(5, "0");
    const hasBin = (n: number) => bstrindex[n] === "1";

    shapes.push({
      rootShape: RootHandShape.FIST,
      ...(hasBin(0) && { thumb: fingerUp() }),
      ...(hasBin(1) && { index: fingerUp() }),
      ...(hasBin(2) && { middle: fingerUp() }),
      ...(hasBin(3) && { ring: fingerUp() }),
      ...(hasBin(4) && { little: fingerUp() }),
    });
  }

  return shapes;
};

console.log(getCombinations());
