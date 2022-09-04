import {useTheme} from '@mui/material';
import * as d from '../types';

export const EditorGlyph = ({
  id,
  glyph,
  width,
  height,
  isFocused,
  yOffset,
}: {
  id: string;
  glyph: d.Glyph;
  width: number;
  height: number;
  isFocused: boolean;
  yOffset?: number;
}) => {
  const theme = useTheme();

  return (
    <text
      id={id}
      x={width / 2 + glyph.x}
      y={height / 2 - glyph.y - (!glyph.character ? 10 : 0) - (yOffset || 0)}
      fill={
        isFocused ? theme.palette.secondary.light : theme.palette.text.primary
      }
      alignmentBaseline="middle"
      textAnchor="middle"
      style={{fontSize: '30px', textAlign: 'center'}}
    >
      {glyph.character || '⎶'}
      {!glyph.character && (
        <animate
          attributeType="XML"
          attributeName="opacity"
          values="0;1;1;0"
          dur="1.5s"
          calcMode="discrete"
          repeatCount="indefinite"
        />
      )}
    </text>
  );
};
