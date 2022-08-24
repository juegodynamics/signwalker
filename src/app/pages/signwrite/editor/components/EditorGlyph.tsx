import {useTheme} from '@mui/material';
import * as d from '../types';

export const EditorGlyph = ({
  glyph,
  isFocused,
}: {
  glyph: d.Glyph;
  isFocused: boolean;
}) => {
  const theme = useTheme();

  return (
    <text
      x={250 + glyph.x}
      y={250 + glyph.y - (!glyph.character ? 40 : 0)}
      fill={
        isFocused ? theme.palette.secondary.light : theme.palette.text.primary
      }
      alignmentBaseline="middle"
      textAnchor="middle"
      style={{fontSize: '120px', textAlign: 'center'}}
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
