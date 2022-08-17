import fs from "fs";

const handShapeNames = [
  "HAND-FIST INDEX",
  "HAND-CIRCLE INDEX",
  "HAND-CUP INDEX",
  "HAND-OVAL INDEX",
  "HAND-HINGE INDEX",
  "HAND-ANGLE INDEX",
  "HAND-FIST INDEX BENT",
  "HAND-CIRCLE INDEX BENT",
  "HAND-FIST THUMB UNDER INDEX BENT",
  "HAND-FIST INDEX RAISED KNUCKLE",
  "HAND-FIST INDEX CUPPED",
  "HAND-FIST INDEX HINGED",
  "HAND-FIST INDEX HINGED LOW",
  "HAND-CIRCLE INDEX HINGE",
  "HAND-FIST INDEX MIDDLE",
  "HAND-CIRCLE INDEX MIDDLE",
  "HAND-FIST INDEX MIDDLE BENT",
  "HAND-FIST INDEX MIDDLE RAISED KNUCKLES",
  "HAND-FIST INDEX MIDDLE HINGED",
  "HAND-FIST INDEX UP MIDDLE HINGED",
  "HAND-FIST INDEX HINGED MIDDLE UP",
  "HAND-FIST INDEX MIDDLE CONJOINED",
  "HAND-FIST INDEX MIDDLE CONJOINED INDEX BENT",
  "HAND-FIST INDEX MIDDLE CONJOINED MIDDLE BENT",
  "HAND-FIST INDEX MIDDLE CONJOINED CUPPED",
  "HAND-FIST INDEX MIDDLE CONJOINED HINGED",
  "HAND-FIST INDEX MIDDLE CROSSED",
  "HAND-CIRCLE INDEX MIDDLE CROSSED",
  "HAND-FIST MIDDLE BENT OVER INDEX",
  "HAND-FIST INDEX BENT OVER MIDDLE",
  "HAND-FIST INDEX MIDDLE THUMB",
  "HAND-CIRCLE INDEX MIDDLE THUMB",
  "HAND-FIST INDEX MIDDLE STRAIGHT THUMB BENT",
  "HAND-FIST INDEX MIDDLE BENT THUMB STRAIGHT",
  "HAND-FIST INDEX MIDDLE THUMB BENT",
  "HAND-FIST INDEX MIDDLE HINGED SPREAD THUMB SIDE",
  "HAND-FIST INDEX UP MIDDLE HINGED THUMB SIDE",
  "HAND-FIST INDEX UP MIDDLE HINGED THUMB CONJOINED",
  "HAND-FIST INDEX HINGED MIDDLE UP THUMB SIDE",
  "HAND-FIST INDEX MIDDLE UP SPREAD THUMB FORWARD",
  "HAND-FIST INDEX MIDDLE THUMB CUPPED",
  "HAND-FIST INDEX MIDDLE THUMB CIRCLED",
  "HAND-FIST INDEX MIDDLE THUMB HOOKED",
  "HAND-FIST INDEX MIDDLE THUMB HINGED",
  "HAND-FIST THUMB BETWEEN INDEX MIDDLE STRAIGHT", // <--
  "HAND-FIST INDEX MIDDLE CONJOINED THUMB SIDE",
  "HAND-FIST INDEX MIDDLE CONJOINED THUMB SIDE CONJOINED",
  "HAND-FIST INDEX MIDDLE CONJOINED THUMB SIDE BENT",
  "HAND-FIST MIDDLE THUMB HOOKED INDEX UP",
  "HAND-FIST INDEX THUMB HOOKED MIDDLE UP",
  "HAND-FIST INDEX MIDDLE CONJOINED HINGED THUMB SIDE",
  "HAND-FIST INDEX MIDDLE CROSSED THUMB SIDE",
  "HAND-FIST INDEX MIDDLE CONJOINED THUMB FORWARD",
  "HAND-FIST INDEX MIDDLE CONJOINED CUPPED THUMB FORWARD",
  "HAND-FIST MIDDLE THUMB CUPPED INDEX UP",
  "HAND-FIST INDEX THUMB CUPPED MIDDLE UP",
  "HAND-FIST MIDDLE THUMB CIRCLED INDEX UP",
  "HAND-FIST MIDDLE THUMB CIRCLED INDEX HINGED",
  "HAND-FIST INDEX THUMB ANGLED OUT MIDDLE UP",
  "HAND-FIST INDEX THUMB ANGLED IN MIDDLE UP",
  "HAND-FIST INDEX THUMB CIRCLED MIDDLE UP",
  "HAND-FIST INDEX MIDDLE THUMB CONJOINED HINGED",
  "HAND-FIST INDEX MIDDLE THUMB ANGLED OUT",
  "HAND-FIST INDEX MIDDLE THUMB ANGLED",
  "HAND-FIST MIDDLE THUMB ANGLED OUT INDEX UP",
  "HAND-FIST MIDDLE THUMB ANGLED OUT INDEX CROSSED",
  "HAND-FIST MIDDLE THUMB ANGLED INDEX UP",
  "HAND-FIST INDEX THUMB HOOKED MIDDLE HINGED",
  "HAND-FLAT FOUR FINGERS",
  "HAND-FLAT FOUR FINGERS BENT",
  "HAND-FLAT FOUR FINGERS HINGED",
  "HAND-FLAT FOUR FINGERS CONJOINED",
  "HAND-FLAT FOUR FINGERS CONJOINED SPLIT",
  "HAND-CLAW FOUR FINGERS CONJOINED",
  "HAND-FIST FOUR FINGERS CONJOINED BENT",
  "HAND-HINGE FOUR FINGERS CONJOINED",
  "HAND-FLAT FIVE FINGERS SPREAD",
  "HAND-FLAT HEEL FIVE FINGERS SPREAD",
  "HAND-FLAT FIVE FINGERS SPREAD FOUR BENT",
  "HAND-FLAT HEEL FIVE FINGERS SPREAD FOUR BENT",
  "HAND-FLAT FIVE FINGERS SPREAD BENT",
  "HAND-FLAT HEEL FIVE FINGERS SPREAD BENT",
  "HAND-FLAT FIVE FINGERS SPREAD THUMB FORWARD",
  "HAND-CUP FIVE FINGERS SPREAD",
  "HAND-CUP FIVE FINGERS SPREAD OPEN",
  "HAND-HINGE FIVE FINGERS SPREAD OPEN",
  "HAND-OVAL FIVE FINGERS SPREAD",
  "HAND-FLAT FIVE FINGERS SPREAD HINGED",
  "HAND-FLAT FIVE FINGERS SPREAD HINGED THUMB SIDE",
  "HAND-FLAT FIVE FINGERS SPREAD HINGED NO THUMB",
  "HAND-FLAT",
  "HAND-FLAT BETWEEN PALM FACINGS",
  "HAND-FLAT HEEL",
  "HAND-FLAT THUMB SIDE",
  "HAND-FLAT HEEL THUMB SIDE",
  "HAND-FLAT THUMB BENT",
  "HAND-FLAT THUMB FORWARD",
  "HAND-FLAT SPLIT INDEX THUMB SIDE",
  "HAND-FLAT SPLIT CENTRE",
  "HAND-FLAT SPLIT CENTRE THUMB SIDE",
  "HAND-FLAT SPLIT CENTRE THUMB SIDE BENT",
  "HAND-FLAT SPLIT LITTLE",
  "HAND-CLAW",
  "HAND-CLAW THUMB SIDE",
  "HAND-CLAW NO THUMB",
  "HAND-CLAW THUMB FORWARD",
  "HAND-HOOK CURLICUE",
  "HAND-HOOK",
  "HAND-CUP OPEN",
  "HAND-CUP",
  "HAND-CUP OPEN THUMB SIDE",
  "HAND-CUP THUMB SIDE",
  "HAND-CUP OPEN NO THUMB",
  "HAND-CUP NO THUMB",
  "HAND-CUP OPEN THUMB FORWARD",
  "HAND-CUP THUMB FORWARD",
  "HAND-CURLICUE OPEN",
  "HAND-CURLICUE",
  "HAND-CIRCLE",
  "HAND-OVAL",
  "HAND-OVAL THUMB SIDE",
  "HAND-OVAL NO THUMB",
  "HAND-OVAL THUMB FORWARD",
  "HAND-HINGE OPEN",
  "HAND-HINGE OPEN THUMB FORWARD",
  "HAND-HINGE",
  "HAND-HINGE SMALL",
  "HAND-HINGE OPEN THUMB SIDE",
  "HAND-HINGE THUMB SIDE",
  "HAND-HINGE OPEN NO THUMB",
  "HAND-HINGE NO THUMB",
  "HAND-HINGE THUMB SIDE TOUCHING INDEX",
  "HAND-HINGE THUMB BETWEEN MIDDLE RING",
  "HAND-ANGLE",
  "HAND-FIST INDEX MIDDLE RING",
  "HAND-CIRCLE INDEX MIDDLE RING",
  "HAND-HINGE INDEX MIDDLE RING",
  "HAND-ANGLE INDEX MIDDLE RING",
  "HAND-HINGE LITTLE",
  "HAND-FIST INDEX MIDDLE RING BENT",
  "HAND-FIST INDEX MIDDLE RING CONJOINED",
  "HAND-HINGE INDEX MIDDLE RING CONJOINED",
  "HAND-FIST LITTLE DOWN",
  "HAND-FIST LITTLE DOWN RIPPLE STRAIGHT",
  "HAND-FIST LITTLE DOWN RIPPLE CURVED",
  "HAND-FIST LITTLE DOWN OTHERS CIRCLED",
  "HAND-FIST LITTLE UP",
  "HAND-FIST THUMB UNDER LITTLE UP",
  "HAND-CIRCLE LITTLE UP",
  "HAND-OVAL LITTLE UP",
  "HAND-ANGLE LITTLE UP",
  "HAND-FIST LITTLE RAISED KNUCKLE",
  "HAND-FIST LITTLE BENT",
  "HAND-FIST LITTLE TOUCHES THUMB",
  "HAND-FIST LITTLE THUMB",
  "HAND-HINGE LITTLE THUMB",
  "HAND-FIST LITTLE INDEX THUMB",
  "HAND-HINGE LITTLE INDEX THUMB",
  "HAND-ANGLE LITTLE INDEX THUMB INDEX THUMB OUT",
  "HAND-ANGLE LITTLE INDEX THUMB INDEX THUMB",
  "HAND-FIST LITTLE INDEX",
  "HAND-CIRCLE LITTLE INDEX",
  "HAND-HINGE LITTLE INDEX",
  "HAND-ANGLE LITTLE INDEX",
  "HAND-FIST INDEX MIDDLE LITTLE",
  "HAND-CIRCLE INDEX MIDDLE LITTLE",
  "HAND-HINGE INDEX MIDDLE LITTLE",
  "HAND-HINGE RING",
  "HAND-ANGLE INDEX MIDDLE LITTLE",
  "HAND-FIST INDEX MIDDLE CROSS LITTLE",
  "HAND-CIRCLE INDEX MIDDLE CROSS LITTLE",
  "HAND-FIST RING DOWN",
  "HAND-HINGE RING DOWN INDEX THUMB HOOK MIDDLE",
  "HAND-ANGLE RING DOWN MIDDLE THUMB INDEX CROSS",
  "HAND-FIST RING UP",
  "HAND-FIST RING RAISED KNUCKLE",
  "HAND-FIST RING LITTLE",
  "HAND-CIRCLE RING LITTLE",
  "HAND-OVAL RING LITTLE",
  "HAND-ANGLE RING LITTLE",
  "HAND-FIST RING MIDDLE",
  "HAND-FIST RING MIDDLE CONJOINED",
  "HAND-FIST RING MIDDLE RAISED KNUCKLES",
  "HAND-FIST RING INDEX",
  "HAND-FIST RING THUMB",
  "HAND-HOOK RING THUMB",
  "HAND-FIST INDEX RING LITTLE",
  "HAND-CIRCLE INDEX RING LITTLE",
  "HAND-CURLICUE INDEX RING LITTLE ON",
  "HAND-HOOK INDEX RING LITTLE OUT",
  "HAND-HOOK INDEX RING LITTLE IN",
  "HAND-HOOK INDEX RING LITTLE UNDER",
  "HAND-CUP INDEX RING LITTLE",
  "HAND-HINGE INDEX RING LITTLE",
  "HAND-ANGLE INDEX RING LITTLE OUT",
  "HAND-ANGLE INDEX RING LITTLE",
  "HAND-FIST MIDDLE DOWN",
  "HAND-HINGE MIDDLE",
  "HAND-FIST MIDDLE UP",
  "HAND-CIRCLE MIDDLE UP",
  "HAND-FIST MIDDLE RAISED KNUCKLE",
  "HAND-FIST MIDDLE UP THUMB SIDE",
  "HAND-HOOK MIDDLE THUMB",
  "HAND-FIST MIDDLE THUMB LITTLE",
  "HAND-FIST MIDDLE LITTLE",
  "HAND-FIST MIDDLE RING LITTLE",
  "HAND-CIRCLE MIDDLE RING LITTLE",
  "HAND-CURLICUE MIDDLE RING LITTLE ON", // <--
  "HAND-CUP MIDDLE RING LITTLE",
  "HAND-HINGE MIDDLE RING LITTLE",
  "HAND-ANGLE MIDDLE RING LITTLE OUT",
  "HAND-ANGLE MIDDLE RING LITTLE IN",
  "HAND-ANGLE MIDDLE RING LITTLE",
  "HAND-CIRCLE MIDDLE RING LITTLE BENT",
  "HAND-CLAW MIDDLE RING LITTLE CONJOINED",
  "HAND-CLAW MIDDLE RING LITTLE CONJOINED SIDE",
  "HAND-HOOK MIDDLE RING LITTLE CONJOINED OUT",
  "HAND-HOOK MIDDLE RING LITTLE CONJOINED IN",
  "HAND-HOOK MIDDLE RING LITTLE CONJOINED",
  "HAND-HINGE INDEX HINGED",
  "HAND-FIST INDEX THUMB SIDE",
  "HAND-HINGE INDEX THUMB SIDE",
  "HAND-FIST INDEX THUMB SIDE THUMB DIAGONAL",
  "HAND-FIST INDEX THUMB SIDE THUMB CONJOINED",
  "HAND-FIST INDEX THUMB SIDE THUMB BENT",
  "HAND-FIST INDEX THUMB SIDE INDEX BENT",
  "HAND-FIST INDEX THUMB SIDE BOTH BENT",
  "HAND-FIST INDEX THUMB SIDE INDEX HINGE",
  "HAND-FIST INDEX THUMB FORWARD INDEX STRAIGHT",
  "HAND-FIST INDEX THUMB FORWARD INDEX BENT",
  "HAND-FIST INDEX THUMB HOOK",
  "HAND-FIST INDEX THUMB CURLICUE",
  "HAND-FIST INDEX THUMB CURVE THUMB INSIDE", // <--
  "HAND-CLAW INDEX THUMB CURVE THUMB INSIDE",
  "HAND-FIST INDEX THUMB CURVE THUMB UNDER",
  "HAND-FIST INDEX THUMB CIRCLE",
  "HAND-CUP INDEX THUMB",
  "HAND-CUP INDEX THUMB OPEN",
  "HAND-HINGE INDEX THUMB OPEN",
  "HAND-HINGE INDEX THUMB LARGE",
  "HAND-HINGE INDEX THUMB",
  "HAND-HINGE INDEX THUMB SMALL",
  "HAND-ANGLE INDEX THUMB OUT",
  "HAND-ANGLE INDEX THUMB IN",
  "HAND-ANGLE INDEX THUMB",
  "HAND-FIST THUMB",
  "HAND-FIST THUMB HEEL",
  "HAND-FIST THUMB SIDE DIAGONAL",
  "HAND-FIST THUMB SIDE CONJOINED",
  "HAND-FIST THUMB SIDE BENT",
  "HAND-FIST THUMB FORWARD",
  "HAND-FIST THUMB BETWEEN INDEX MIDDLE",
  "HAND-FIST THUMB BETWEEN MIDDLE RING", //<--
  "HAND-FIST THUMB BETWEEN RING LITTLE",
  "HAND-FIST THUMB UNDER TWO FINGERS",
  "HAND-FIST THUMB OVER TWO FINGERS",
  "HAND-FIST THUMB UNDER THREE FINGERS",
  "HAND-FIST THUMB UNDER FOUR FINGERS",
  "HAND-FIST THUMB OVER FOUR RAISED KNUCKLES",
  "HAND-FIST",
  "HAND-FIST HEEL",
];

enum Finger {
  INDEX = "INDEX",
  MIDDLE = "MIDDLE",
  RING = "RING",
  LITTLE = "LITTLE",
}
const Digit = {
  ...Finger,
  THUMB: "THUMB",
};
type Digit = keyof typeof Digit;

const isFinger = (unit: string): unit is Finger => Object.values(Finger).includes(unit as Finger);
const isThumb = (unit: string): unit is Digit => unit === Digit.THUMB;

type CrossableFinger = Finger.INDEX | Finger.MIDDLE;
const isCrossableFinger = (unit: string): unit is CrossableFinger =>
  [Finger.INDEX, Finger.MIDDLE].includes(unit as Finger);

interface Shape {
  pose: string;
}

interface FingerShape extends Shape {
  conjoined?: boolean;
}

// interface CrossableFingerShape extends FingerShape {
//   crossed?: boolean;

// }

interface ThumbShape extends Shape {
  conjoined?: boolean;
  relatedFingers?: Finger[];
}

interface HandShape extends Shape {
  id?: number;
  symbol?: string;
  slug?: string;
  unicodeName?: string;
  name: string;
  thumb: ThumbShape;
  index: FingerShape;
  middle: FingerShape;
  ring: FingerShape;
  little: FingerShape;
  layers?: Array<Digit[]>;
  modifiers?: string[];
}

const getDefaultHandShape = (handShapeName: string) => ({
  name: handShapeName,
  pose: "",
  thumb: { pose: "DOWN" },
  index: { pose: "DOWN" },
  middle: { pose: "DOWN" },
  ring: { pose: "DOWN" },
  little: { pose: "DOWN" },
  layers: [],
  modifiers: [],
});

const getSlug = (handShape: HandShape): string => {
  const units: string[] = [handShape.pose];

  if (handShape.thumb.pose !== "DOWN") {
    units.push("");
  }

  return units.join("-");
};

class HandShapeNameParser {
  handShape: HandShape;
  currentlyFocusedDigits: Digit[] = [];
  isNextDigitNewSection = false;
  currentIndex = 0;
  units: string[] = [];

  constructor() {
    this.handShape = getDefaultHandShape("");
  }

  public parseHandShapeName(initialHandShapeName: string): HandShape {
    const handShapeName = initialHandShapeName
      .replace("RAISED KNUCKLE", "RAISED_KNUCKLE")
      .replace("HINGED LOW", "HINGED_LOW")
      .replace("NO THUMB", "THUMB DOWN")
      .replace("ANGLED OUT", "ANGLED_OUT")
      .replace("ANGLED IN", "ANGLED_IN")
      .replace("FOUR FINGERS", "INDEX MIDDLE RING LITTLE")
      .replace("FIVE FINGERS", "THUMB INDEX MIDDLE RING LITTLE")
      .replace("THUMB CONJOINED", "THUMB UNIT");

    this.resetHandShape(handShapeName);
    this.resetFocusedDigits();
    this.currentIndex = 0;

    this.units = handShapeName.split(" ");
    this.parseNextUnit();

    return this.handShape;
  }

  private parseNextUnit() {
    if (this.currentIndex >= this.units.length) {
      return;
    }

    const unit = this.units[this.currentIndex];

    if (this.currentIndex === 0) {
      this.handShape.pose = unit.split("-")[1];
    } else if (isFinger(unit)) {
      this.addFocusedDigit(unit);
      this.setDigitPose(unit, "UP", "DOWN");
    } else if (isThumb(unit)) {
      this.addFocusedDigit(unit);
      this.setDigitPose(unit, "OUT", "DOWN");
    } else {
      this.isNextDigitNewSection = true;
      this.parseKeyword(unit);
    }

    this.currentIndex++;
    this.parseNextUnit();
  }

  private parseKeyword(keyword: string) {
    switch (keyword) {
      case "CROSSED":
        this.currentlyFocusedDigits.forEach((digit) => this.handShape.layers?.push([digit]));
        return;
      case "OVER":
        const nextUnit = this.units[this.currentIndex + 1];
        const over = isFinger(nextUnit) ? nextUnit : undefined;
        if (over) {
          this.handShape.layers?.push([over]);
          this.handShape.layers?.push([...this.currentlyFocusedDigits]);
        }
        return;
      case "CONJOINED":
        this.currentlyFocusedDigits.forEach((digit) => this.setDigitConjoined(digit));
        return;
      case "SPREAD":
        this.handShape.modifiers?.push(keyword);
    }

    if (["SPREAD", "HEEL", "OPEN", "SMALL", "LARGE"] || !this.currentlyFocusedDigits) {
      this.handShape.modifiers?.push(keyword);
      return;
    }

    if (
      isThumb(this.currentlyFocusedDigits[this.currentlyFocusedDigits.length - 1]) &&
      !["CUPPED", "HINGED", "CIRCLED", "HOOKED", "ANGLED_OUT", "ANGLED_IN"].includes(keyword)
    ) {
      this.handShape.thumb.pose = keyword;
    } else {
      this.currentlyFocusedDigits.forEach((digit) => this.setDigitPose(digit, keyword));
    }
  }

  private getCurrentlyFocusedCrossable(): CrossableFinger[] {
    const currentlyFocusedCrossable: CrossableFinger[] = [];
    this.currentlyFocusedDigits.forEach((digit) => {
      if (isCrossableFinger(digit)) {
        currentlyFocusedCrossable.push(digit);
      }
    });
    return currentlyFocusedCrossable;
  }

  private addFocusedDigit(digit: Digit) {
    if (this.isNextDigitNewSection) {
      this.isNextDigitNewSection = false;
      this.resetFocusedDigits();
    }
    this.currentlyFocusedDigits.push(digit);
  }

  private setDigitPose(digit: Digit, pose: string, priorPose?: string) {
    switch (digit) {
      case Digit.THUMB:
        if (!priorPose || this.handShape.thumb.pose === priorPose) this.handShape.thumb.pose = pose;
        return;
      case Finger.INDEX:
        if (!priorPose || this.handShape.index.pose === priorPose) this.handShape.index.pose = pose;
        return;
      case Finger.MIDDLE:
        if (!priorPose || this.handShape.middle.pose === priorPose) this.handShape.middle.pose = pose;
        return;
      case Finger.RING:
        if (!priorPose || this.handShape.ring.pose === priorPose) this.handShape.ring.pose = pose;
        return;
      case Finger.LITTLE:
        if (!priorPose || this.handShape.little.pose === priorPose) this.handShape.little.pose = pose;
        return;
    }
  }

  private setDigitConjoined(digit: Digit) {
    switch (digit) {
      case Digit.THUMB:
        return (this.handShape.thumb.conjoined = true);
      case Finger.INDEX:
        return (this.handShape.index.conjoined = true);
      case Finger.MIDDLE:
        return (this.handShape.middle.conjoined = true);
      case Finger.RING:
        return (this.handShape.ring.conjoined = true);
      case Finger.LITTLE:
        return (this.handShape.little.conjoined = true);
    }
  }

  private resetHandShape(handShapeName: string) {
    this.handShape = this.handShape = getDefaultHandShape(handShapeName);
  }

  private resetFocusedDigits() {
    this.currentlyFocusedDigits = [];
  }
}

const parseAllHandShapeNames = () => {
  const handShapes: HandShape[] = [];

  let currentID = 0x40001;

  handShapeNames.forEach((handShapeName) => {
    const handShape = new HandShapeNameParser().parseHandShapeName(handShapeName);
    if (!handShape.modifiers?.length) {
      handShape.modifiers = undefined;
    }
    if (!handShape.layers?.length) {
      handShape.layers = undefined;
    }

    handShape.id = currentID;
    handShape.symbol = String.fromCodePoint(currentID);

    handShapes.push({
      id: currentID,
      symbol: String.fromCodePoint(currentID),
      unicodeName: handShapeName,
      ...handShape,
    });

    currentID += 0x60;
  });

  fs.writeFileSync("./playground/sutton-export.json", JSON.stringify(handShapes, null, "  "));
};

parseAllHandShapeNames();
