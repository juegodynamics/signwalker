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
      x={62.5 + glyph.x}
      y={62.5 - glyph.y - (!glyph.character ? 10 : 0)}
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
