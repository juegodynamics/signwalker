import { Enum, EnumType } from "extensions";

export const GlyphType = new Enum("handshape", "contact", "fingerMovement", "handMovement");
export type GlyphType = EnumType<typeof GlyphType>;

export abstract class AbstractGlyph {
  glyphType: GlyphType;
  angle: number = 0;
  x: number = 0;
  y: number = 0;
}
