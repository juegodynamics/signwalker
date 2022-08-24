import { Enum, EnumType, Repeat } from "extensions";

// "񆞁"

const Indicator = new Enum("񆇡", "񆌁", "񆐡", "񆕁", "񆙡");
type Indicator = EnumType<typeof Indicator>;

const initialCode = 0x461e1;
const IndicatorCodes = Indicator.reduce((_, index) => initialCode + 288 * index);

const Frequency = new Enum("single", "double", "triple");
type Frequency = EnumType<typeof Frequency>;

// const FrequencyOffsets: Record<string,number> = {
//   single: 0,
//   double: 0x60,
//   triple: 0x70,
// }

// const BetweenOffsets = {
//   false: 0,
//   true: 0,
// }

export class Glyph {
  glyphType = "contact";
  selectedRoot?: Indicator = "񆇡";
  between: boolean = false;
  frequency: Frequency = "single";
  angle: number = 0;
  x: number = 0;
  y: number = 0;

  static fromSelectedRoot(selectedRoot: Indicator): Glyph {
    return new Glyph({ selectedRoot });
  }

  constructor(values?: Partial<Glyph>) {
    if (values) {
      Object.assign(this, values);
    }
  }

  public getCharacter(): string {
    if (!this.selectedRoot) {
      return "";
    }

    if (!this.between && this.frequency === "single") {
      return this.selectedRoot || "";
    }

    // const isBetweenable = this.selectedRoot !== "񆞁";
    // const isRootAtDouble = this.selectedRoot !== "񆞁";
    // const isDoubled =

    return String.fromCodePoint(
      IndicatorCodes[this.selectedRoot] +
        (this.between ? 96 * 2 : 96) +
        (this.frequency !== "single" ? 16 : 0) +
        this.angle
    );
  }

  public isEqual(other: Glyph): boolean {
    return this.getCharacter() === other.getCharacter();
  }

  public copy(values?: Partial<Glyph>): Glyph {
    const other = new Glyph();
    Object.assign(other, { ...this, ...(values || {}) });
    return other;
  }

  public getRow1Options(): Glyph[] {
    return Repeat(8).map(
      (index) =>
        new Glyph({
          ...this,
          between: index < 4 ? false : true,
          frequency: "double",
          angle: index % 4,
        })
    );
  }

  public getRow2Options(): Glyph[] {
    return Repeat(8).map(
      (index) =>
        new Glyph({
          ...this,
          between: index < 4 ? false : true,
          frequency: "double",
          angle: index % 4,
        })
    );
  }

  public getRow3Options(): Glyph[] {
    return [];
  }
}
