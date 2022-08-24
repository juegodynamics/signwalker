import { Enum, EnumType } from "extensions";
import { AbstractGlyph, GlyphType } from "../base";

export const Finger = new Enum("thumb", "index", "middle", "ring", "little");
export type Finger = EnumType<typeof Finger>;
export type FingerMap<ValueT = boolean> = Partial<Record<Finger, ValueT>>;

export const Laterality = new Enum("left", "right");
export type Laterality = EnumType<typeof Laterality>;

export const Perspective = new Enum("wallplane", "floorplane");
export type Perspective = EnumType<typeof Perspective>;

export const Variant = new Enum(
  "cupped",
  "circled",
  "hooked",
  "hinged",
  "bent",
  "raised_knuckle",
  "open",
  "under",
  "forward",
  "conjoined",
  "crossed"
);
export type Variant = EnumType<typeof Variant>;

export class Glyph extends AbstractGlyph {
  glyphType: GlyphType = "handshape";
  selectedRoot?: string;
  selectedFingers: FingerMap = {};
  selectedFingerVariants: FingerMap<string[]> = {};
  currentRevealedVariants: string[] = [];
  hand: Laterality = "right";
  wristAngle: number = 0;
  perspective: Perspective = "wallplane";

  constructor(values?: Partial<Glyph>) {
    super();
    if (values) {
      Object.assign(this, values);
    }
  }
}
