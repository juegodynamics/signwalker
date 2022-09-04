import {Button, Paper, Stack, useTheme} from '@mui/material';
import {swu} from '@sutton-signwriting/core';
import React from 'react';

const pi = Math.PI;
const tau = 2 * Math.PI;

class Glyph {
  symbol: string;
  coord: [number, number];
  size: number = 120;
  color?: string;
  angle?: number;

  constructor(
    symbol: string,
    coord: [number, number],
    options?: Pick<Glyph, 'color' | 'size' | 'angle'>
  ) {
    this.symbol = symbol;
    this.coord = coord;
    Object.assign(this, options);
  }

  public set<K extends keyof Glyph>(key: K, value: this[K]): Glyph {
    this[key] = value;
    return this;
  }

  public get x(): number {
    return this.coord[0];
  }
  public get y(): number {
    return this.coord[1];
  }
  public copy(): Glyph {
    return new Glyph(this.symbol, this.coord, {...this});
  }
}

export const GlyphBox = ({
  glyphs,
  minX,
  maxX,
  minY,
  maxY,
  scale,
  fontSize,
  children,
}: {
  glyphs: Array<Glyph>;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  scale: number;
  fontSize: number;
  children?: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{height: '100%', width: '100%'}}
    >
      <Paper sx={{padding: 2}}>
        <svg
          viewBox={[minX, minY, maxX, maxY].join(' ')}
          style={{
            width: `${scale * (maxX - minX)}px`,
            height: `${scale * (maxY - minY)}px`,
          }}
        >
          <g>
            <path d={`M 250 ${minY} L 250 ${maxY}`} stroke="red" />
            {glyphs.map(
              ({symbol, color, size, angle, coord: [x, y]}, glyphIndex) => (
                <text
                  key={glyphIndex}
                  id={`${glyphIndex}`}
                  x={x}
                  y={y}
                  fill={color || theme.palette.text.primary}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  transform={angle ? `rotate(${angle}, ${x}, ${y})` : undefined}
                  style={{
                    fontSize: `${size || fontSize}px`,
                    textAlign: 'center',
                  }}
                >
                  {symbol}
                </text>
              )
            )}
          </g>
        </svg>
      </Paper>
      {children}
    </Stack>
  );
};

const offset = 250;
const scale = 0.5;

export const parseSign = (sign: string) => {
  const parsedSign: {
    max: [number, number];
    spatials: Array<{
      symbol: string;
      coord: [number, number];
    }>;
  } = swu.parse.sign('𝠀񀀒񀀚񋟅񋠉𝠃𝤝𝤬񋡩𝣵𝤌񀀒𝤈𝣠񋠥𝤎𝤂񀀚𝣯𝣩');

  let [minX, minY] = parsedSign.spatials[0].coord;
  let [maxX, maxY] = parsedSign.spatials[0].coord;
  parsedSign.spatials
    .slice(1, parsedSign.spatials.length)
    .forEach(({coord: [x, y]}) => {
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
      if (y < minY) {
        minY = y;
      }
      if (y > maxY) {
        maxY = y;
      }
    });
  console.log({
    x: (maxX - 500 + (minX - 500)) / 2,
    y: (maxY - 500 + (minY - 500)) / 2,
  });

  const spatials = parsedSign.spatials.map((spatial) => ({
    ...spatial,
    coord: [
      (spatial.coord[0] - 500) * 4 +
        250 -
        (4 * (maxX - 500 + (minX - 500))) / 2,
      (spatial.coord[1] - 500) * 4 +
        250 -
        (4 * (maxY - 500 + (minY - 500))) / 2,
    ],
  }));

  return spatials;
};

export const useSmoothFunction = <T,>(
  defaultState: T,
  timeFunc: (ms: number) => T
): T => {
  const [state, setState] = React.useState<T>(defaultState);

  const requestRef = React.useRef<number>();
  const totalTimeRef = React.useRef<number>(0);

  const animate: FrameRequestCallback = (time: number) => {
    const newTotalTime = time + totalTimeRef.current / 1000;

    setState(timeFunc(newTotalTime));

    totalTimeRef.current = newTotalTime;

    requestRef.current = requestAnimationFrame(animate);
  };
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return state;
};

export const useRequestAnimationRange = (
  min: number,
  max: number,
  onFrame: (ms: number) => void
): [boolean, (prop: boolean) => void] => {
  const requestRef = React.useRef<number>();
  const initialTimeRef = React.useRef<number>(-1);
  const totalTimeRef = React.useRef<number>(0);

  const [isRunning, setIsRunning] = React.useState<boolean>(true);

  const animate: FrameRequestCallback = (time: number) => {
    if (initialTimeRef.current === -1) {
      initialTimeRef.current = time;
    }
    const totalTimePlus =
      time - initialTimeRef.current + totalTimeRef.current / 1000;
    const newTotalTime = totalTimePlus < min ? min : totalTimePlus;

    onFrame(newTotalTime);
    totalTimeRef.current = newTotalTime;

    if (newTotalTime >= max) {
      setIsRunning(false);
      console.log('finished running');
      return;
    }
    requestRef.current = requestAnimationFrame(animate);
  };
  React.useEffect(() => {
    if (isRunning) {
      initialTimeRef.current = -1;
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        requestRef.current && cancelAnimationFrame(requestRef.current);
      };
    }
  }, [isRunning]);

  return [isRunning, setIsRunning];
};

const ease = (time: number, max: number, rate: number = 1) =>
  max / (1 + Math.exp(-rate * (time - max / 2)));

export default function Signimator() {
  const theme = useTheme();

  const leftHand = new Glyph('񀀚', [188, 198]);
  const rightHand = new Glyph('񀀒', [288, 162]);

  const glyphs: Glyph[] = [
    new Glyph('񋡩', [212, 338]),
    rightHand,
    new Glyph('񋠥', [312, 298]),
    leftHand,
  ].map((g) => g.set('color', theme.palette.text.disabled).set('size', 120));

  const [_time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = useRequestAnimationRange(0, 1000, (ms) =>
    setTime(ms)
  );

  const time = 0;
  // const cycleAngle = ease(time / 100, 4 * Math.PI, 0.5);
  const cycleAngle = (2 * tau * time) / 1000;

  const leftHandRotator = new Glyph(
    leftHand.symbol,
    [
      leftHand.x + 10 * Math.sin(cycleAngle),
      leftHand.y + 35 * Math.cos(cycleAngle),
    ],
    {
      color: theme.palette.primary.main,
      size:
        leftHand.size * (1 + (1 / 6) * Math.cos(cycleAngle - (5 * tau) / 8)),
      angle: 45 * (1 + Math.sin(cycleAngle)),
    }
  );

  const rightHandRotator = new Glyph(
    rightHand.symbol,
    [
      rightHand.x - 10 * Math.sin(cycleAngle),
      rightHand.y - 35 * Math.cos(cycleAngle),
    ],
    {
      color: theme.palette.primary.main,
      size:
        rightHand.size *
        (1 + (1 / 6) * Math.cos(cycleAngle + tau - (5 * tau) / 8)),
      angle: 45 * (-1 - Math.sin(cycleAngle - tau)),
    }
  );

  return (
    <>
      <GlyphBox
        glyphs={[...glyphs, leftHandRotator, rightHandRotator]}
        minX={250 - offset}
        maxX={250 + offset}
        minY={250 - offset}
        maxY={250 + offset}
        scale={1}
        fontSize={4 * 30}
      >
        <Button onClick={() => setIsRunning(true)} disabled={isRunning}>
          Run
        </Button>
      </GlyphBox>
    </>
  );
}
