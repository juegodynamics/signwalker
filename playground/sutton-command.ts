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

enum HandCommand {
  SPREAD = "SPREAD",
  SPLIT = "SPLIT",
  HEEL = "HEEL",
  OPEN = "OPEN",
  CURLICUE = "CURLICUE",
  BETWEEN_PALM_FACINGS = "BETWEEN_PALM_FACINGS",
  SMALL = "SMALL",
  LARGE = "LARGE",
  RIPPLE_STRAIGHT = "RIPPLE_STRAIGHT",
  RIPPLE_CURVED = "RIPPLE_CURVED",
}

const isHandCommand = (unit: string): unit is HandCommand => Object.values(HandCommand).includes(unit as HandCommand);

enum Finger {
  THUMB = "THUMB",
  INDEX = "INDEX",
  MIDDLE = "MIDDLE",
  RING = "RING",
  LITTLE = "LITTLE",
}

const isFinger = (unit: string): unit is Finger => Object.values(Finger).includes(unit as Finger);

enum FingerShape {
  BENT = "BENT",
  RAISED_KNUCKLE = "RAISED_KNUCKLE",
  CUPPED = "CUPPED",
  HINGED = "HINGED",
  HINGED_LOW = "HINGED_LOW",
  STRAIGHT = "STRAIGHT",
  SIDE = "SIDE",
  ANGLED = "ANGLED",
  ANGLED_IN = "ANGLED_IN",
  ANGLED_OUT = "ANGLED_OUT",
  UP = "UP",
  DOWN = "DOWN",
  FORWARD = "FORWARD",
  OUT = "OUT",
  DIAGONAL = "DIAGONAL",
  CURVE = "CURVE",
}

const isFingerShape = (unit: string): unit is FingerShape => Object.values(FingerShape).includes(unit as FingerShape);
const fingerShapeAliases: Record<string, FingerShape> = {
  HINGE: FingerShape.HINGED,
};

const isLimitedToLastFinger = (fingerShape: FingerShape): boolean =>
  [FingerShape.SIDE, FingerShape.ANGLED, FingerShape.ANGLED_IN, FingerShape.ANGLED_OUT, FingerShape.CURVE].includes(
    fingerShape
  );

const parseFingerShape = (unit: string): FingerShape | undefined => {
  if (isFingerShape(unit)) return unit;
  if (fingerShapeAliases[unit]) return fingerShapeAliases[unit];
  return;
};

interface FingerShapeCommand {
  finger: Finger;
  shape: FingerShape;
}

enum FingerPosition {
  MOVE = "MOVE",
  GROUP = "GROUP",
  CROSS = "CROSS",
}

interface FingerPositionCommand {
  position: FingerPosition;
  getFormula(): string;
}

class MoveFingerPositionCommand implements FingerPositionCommand {
  position = FingerPosition.MOVE;
  finger: Finger;
  orientation: "OVER" | "UNDER" | "BETWEEN" | "TOUCHING";
  relativeFingers: Finger[];

  constructor(props: Pick<MoveFingerPositionCommand, "finger" | "orientation" | "relativeFingers">) {
    if (props.relativeFingers.length === 0) {
      throw new Error(
        `MoveFingerPositionCommand.constructor: relativeFingers.length === 0 \n${JSON.stringify(props, null, "  ")}`
      );
    }
    Object.assign(this, props);
  }

  getFormula: FingerPositionCommand["getFormula"] = () =>
    `MOVE(${this.finger}-->${this.orientation}:${this.relativeFingers.join("|")})`;
}

class GroupFingerPositionCommand implements FingerPositionCommand {
  position = FingerPosition.GROUP;
  style: "CONJOINED" | "CIRCLED" | "HOOKED";
  members: Array<Finger | "PALM">;

  constructor({ fingers, style }: { fingers: Finger[]; style: GroupFingerPositionCommand["style"] }) {
    if (fingers.length === 0) {
      throw new Error("GroupFingerPositionCommand.constructor: fingers.length === 0");
    }
    this.members = fingers;
    this.style = style;
    if (this.members.includes(Finger.THUMB) && this.style === "CONJOINED") this.members.push("PALM");
  }

  getFormula: FingerPositionCommand["getFormula"] = () => `GROUP(${this.style}:${this.members.join("|")})`;
}

class CrossFingerPositionCommand implements FingerPositionCommand {
  position = FingerPosition.CROSS;
  fingers: [Finger, Finger];

  constructor(props: Pick<CrossFingerPositionCommand, "fingers">) {
    Object.assign(this, props);
  }

  getFormula: FingerPositionCommand["getFormula"] = () => `CROSS(${this.fingers.join(":")})`;
}

class HandShape {
  id: number;
  name: string;
  symbol: string;
  rootShape: string;
  handCommands: string[] = [];
  activeFingers: Finger[] = [];
  fingerShapeCommands: FingerShapeCommand[] = [];
  fingerPositionCommands: FingerPositionCommand[] = [];

  private units: string[] = [];
  private currentIndex: number = 0;

  constructor({ id, name }: Pick<HandShape, "id" | "name">) {
    this.id = id;
    this.name = name;
    this.symbol = String.fromCodePoint(id);
    this.units = this.cleanupName(name).split(" ");
    this.rootShape = this.units[0].split("-")[1];

    this.beginParsing();
  }

  private cleanupName(name: string): string {
    let aliasedName = Object.entries(this.preprocessingAliases()).reduce(
      (lastName, [oldStr, newStr]) => lastName.replace(oldStr, newStr),
      name
    );

    if (aliasedName.split(" ").includes("OTHERS")) {
      const fingers = aliasedName.split(" ").filter(isFinger);
      aliasedName = aliasedName.replace(
        "OTHERS",
        Object.values(Finger)
          .filter((finger) => !fingers.includes(finger))
          .join(" ")
      );
    }

    if (aliasedName.split(" ").includes("BOTH")) {
      const fingers = aliasedName.split(" ").filter(isFinger);
      aliasedName = aliasedName.replace("BOTH", fingers.join(" "));
    }

    return aliasedName;
  }

  private preprocessingAliases(): Record<string, string> {
    return {
      "HINGED LOW": "HINGED_LOW",
      "RAISED KNUCKLE": "RAISED_KNUCKLE",
      KNUCKLES: "KNUCKLE",
      "ANGLED IN ": "ANGLED_IN ",
      "ANGLED OUT": "ANGLED_OUT",
      "BETWEEN PALM FACINGS": "BETWEEN_PALM_FACINGS",
      "FOUR FINGERS": "INDEX MIDDLE RING LITTLE",
      FOUR: "INDEX MIDDLE RING LITTLE",
      "FIVE FINGERS": "THUMB INDEX MIDDLE RING LITTLE",
      "TWO FINGERS": "INDEX MIDDLE",
      "THREE FINGERS": "INDEX MIDDLE RING",
      "NO THUMB": "THUMB CONJOINED",
      "SPLIT LITTLE": "INDEX MIDDLE RING CONJOINED SPLIT",
      "SPLIT CENTRE": "INDEX MIDDLE CONJOINED RING LITTLE CONJOINED SPLIT",
      "SPLIT INDEX": "MIDDLE RING LITTLE CONJOINED SPLIT",
      "RIPPLE ": "RIPPLE_",
      TOUCHES: "TOUCHING",
      " HOOK": " HOOKED",
      HOOKEDED: "HOOKED",
      " CIRCLE": " CIRCLED",
      CIRCLEDD: "CIRCLED",
    };
  }

  public toJSON(): Record<string, any> {
    const thisJson: Record<string, any> = { ...this };
    delete thisJson.units;
    delete thisJson.currentIndex;
    return Object.entries(thisJson).reduce(
      (part, [key, value]) => (value === undefined ? part : { ...part, [key]: value }),
      {}
    );
  }

  static toTSVcolumns(): string {
    return ["id", "code", "symbol", "name", "rootShape", "handCommands", "activeFingers", "fingerShapeCommands"].join(
      "\t"
    );
  }

  public toTSV(): string {
    const values: string[] = [
      `${this.id}`,
      `0x${this.id.toString(16)}`,
      this.symbol,
      this.name,
      this.rootShape,
      this.handCommands?.join(",") || "",
      this.activeFingers?.join(",") || "",
      this.fingerShapeCommands?.map((command) => `${command.finger}:${command.shape}`).join(",") || "",
      this.fingerPositionCommands.map((command) => command.getFormula()).join(","),
    ];

    return values.join("\t");
  }

  public beginParsing(): void {
    let isFinished = false;
    while (!isFinished) {
      isFinished = Boolean(this.parseNextUnit());
    }
  }
  private parseNextUnit(): boolean | undefined {
    try {
      this.currentIndex++;
      if (this.currentIndex >= this.units.length) {
        return true;
      }

      const unit = this.units[this.currentIndex];

      if (isHandCommand(unit)) {
        this.handCommands.push(unit);
        return;
      }

      if (isFinger(unit)) {
        this.activeFingers.push(unit);
        return;
      }

      const fingerShape = parseFingerShape(unit);
      if (fingerShape) {
        const priorFingers = this.getPriorConsecutiveFingers();

        (isLimitedToLastFinger(fingerShape) ? [priorFingers[priorFingers.length - 1]] : priorFingers).forEach(
          (finger) => {
            this.fingerShapeCommands.push({ finger, shape: fingerShape });
          }
        );
        return;
      }

      switch (unit) {
        case "UNDER":
        case "OVER":
        case "BETWEEN":
        case "TOUCHING":
          const priorFingers = this.getPriorConsecutiveFingers();
          let relativeFingers = this.getNextConsecutiveFingers();
          if (!relativeFingers.length) {
            relativeFingers = Object.values(Finger).filter((finger) => !priorFingers.includes(finger));
          }

          this.getPriorConsecutiveFingers().forEach((finger) => {
            this.fingerPositionCommands.push(
              new MoveFingerPositionCommand({
                finger,
                orientation: unit,
                relativeFingers,
              })
            );
          });
          return;
        case "CONJOINED":
        case "CIRCLED":
        case "HOOKED":
          this.fingerPositionCommands.push(
            new GroupFingerPositionCommand({ fingers: this.getPriorConsecutiveFingers(), style: unit })
          );
          return;
        case "CROSSED": {
          const [last, secondToLast] = this.getPriorConsecutiveFingers().reverse();
          this.fingerPositionCommands.push(new CrossFingerPositionCommand({ fingers: [secondToLast, last] }));
          return;
        }
        case "CROSS": {
          const [last] = this.getPriorConsecutiveFingers().reverse();
          const [first] = this.getNextConsecutiveFingers();
          this.fingerPositionCommands.push(new CrossFingerPositionCommand({ fingers: [last, first] }));
          return;
        }
        case "INSIDE":
        case "IN": {
          const priorFingers = this.getPriorConsecutiveFingers();
          const [first, second] = Object.values(Finger).filter((finger) => !priorFingers.includes(finger));
          this.fingerPositionCommands.push(new CrossFingerPositionCommand({ fingers: [first, second] }));
          return;
        }
        case "OUTSIDE":
        case "OUT": {
          const priorFingers = this.getPriorConsecutiveFingers();
          const [first, second] = Object.values(Finger).filter((finger) => !priorFingers.includes(finger));
          this.fingerPositionCommands.push(new CrossFingerPositionCommand({ fingers: [second, first] }));
          return;
        }
        case "ON":
          if (this.currentIndex === this.units.length - 1) return;
      }
      /*eslint no-throw-literal: "off"*/
      throw {
        unrecognizedCommand: unit,
        ...this.toJSON(),
      };
    } catch (error) {
      if (typeof error === "object" && error && "unrecognizedCommand" in error) throw error;
      throw {
        error,
        ...this.toJSON(),
      };
    }
  }

  private getPriorConsecutiveFingers(): Finger[] {
    const priorConsecutiveFingers: Finger[] = [];
    for (let backIndex = this.currentIndex - 1; backIndex > 0; backIndex--) {
      const priorUnit = this.units[backIndex];
      if (isFinger(priorUnit)) {
        priorConsecutiveFingers.push(priorUnit);
      } else if (priorConsecutiveFingers.length) {
        break;
      }
    }
    return priorConsecutiveFingers.reverse();
  }

  private getNextConsecutiveFingers(): Finger[] {
    const nextConsecutiveFingers: Finger[] = [];
    for (let forwardIndex = this.currentIndex + 1; forwardIndex < this.units.length; forwardIndex++) {
      const nextUnit = this.units[forwardIndex];
      if (isFinger(nextUnit)) {
        nextConsecutiveFingers.push(nextUnit);
      } else if (nextConsecutiveFingers.length) {
        break;
      }
    }
    return nextConsecutiveFingers;
  }
}

const getHandShapes = () => {
  const handShapes: HandShape[] = [];

  let id = 0x40001;

  try {
    handShapeNames.forEach((name) => {
      handShapes.push(new HandShape({ id, name }));
      id += 0x60;
    });
  } catch (e) {
    console.log(e);
  }

  return handShapes;
};

const parse = () => {
  const handShapes = getHandShapes();

  fs.writeFileSync("./playground/sutton-command-export.json", JSON.stringify(handShapes, null, "  "));
  fs.writeFileSync(
    "./playground/sutton-command-export.tsv",
    [HandShape.toTSVcolumns(), ...handShapes.map((handShape) => handShape.toTSV())].join("\n")
  );
};

parse();
