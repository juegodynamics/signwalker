import * as selectors from './selectors';

export interface GlyphSelection {
  selectionType: 'handshape';
  root?: selectors.RootHandShape;
  wristAngle: number;
  angle: number;
  digits: string[];
  fingerShapes: selectors.FingerShape[];
  variant?: string;
}
