import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {GlyphButtonProps} from 'app/pages/signwrite/keyboard';
import * as contact from './contact';
import * as handshape from './handshape';
import {GlyphSelection} from './types';

export const defaultSelection = handshape.defaultSelection;

const RootSelection = ({
  rows,
  fontSize,
  borderRadiusSize,
  isSelected,
}: {
  rows: string[][];
  fontSize?: string;
  borderRadiusSize?: string;
  isSelected?: boolean;
}) => (
  <Box sx={{p: `calc(${borderRadiusSize} * 0.22)`, width: '100%'}}>
    <Paper
      // variant="outlined"
      sx={{
        p: 0,
        width: '100%',
        borderRadius: borderRadiusSize,
        ...(isSelected && {
          borderColor: 'secondary.light',
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: 'divider',
        }),
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={-1.5}
        sx={{height: '100%'}}
      >
        {rows.map((row, rowIndex) => (
          <Stack
            key={rowIndex}
            justifyContent="center"
            alignItems="center"
            direction="row"
          >
            {row.map((character, characterIndex) => (
              <Typography
                key={characterIndex}
                sx={{
                  fontSize,
                }}
              >
                {character}
              </Typography>
            ))}
          </Stack>
        ))}
      </Stack>
    </Paper>
  </Box>
);

const HandshapeSelection = (props: {
  isSelected?: boolean;
  captionFontSize: string;
}) => (
  <RootSelection
    rows={[['񀟣']]}
    fontSize={`calc(${props.captionFontSize} * 1.9)`}
    {...props}
  />
);

const ContactSelection = (props: {
  isSelected?: boolean;
  captionFontSize: string;
}) => (
  <RootSelection
    rows={[
      ['񆇡', '񆌁', '񆐡'],
      ['񆕁', '񆙡', '񆞁'],
    ]}
    fontSize={`calc(${props.captionFontSize} * 2.3)`}
    {...props}
  />
);

const empty = (): GlyphButtonProps<GlyphSelection> => ({
  glyph: '',
  onClick: (prior) => prior,
  isEmpty: true,
});

const createEmptyPadding = (
  amount: number
): GlyphButtonProps<GlyphSelection>[][] => {
  if (amount <= 0) {
    return [[]];
  }
  return [...Array(amount).keys()].map((index) => {
    return [empty()];
  });
};

export class KeyboardConfigurator {
  static resolveKey(selection: GlyphSelection): string | undefined {
    switch (selection.selectionType) {
      case 'contact':
        return contact.KeyboardConfigurator.resolveKey(selection);
      case 'handshape':
        return handshape.KeyboardConfigurator.resolveKey(selection);
      default:
        return;
    }
  }

  static getGlyphLayout(
    selection: GlyphSelection
  ): Array<Array<Array<GlyphButtonProps<GlyphSelection>>>> {
    const selectionTypeOptions: GlyphButtonProps<GlyphSelection>[] = [
      {
        glyph: (props) => (
          <HandshapeSelection
            {...props}
            isSelected={selection.selectionType === 'handshape'}
          />
        ),
        hideCaption: true,
        // isSelected: selection.selectionType === 'handshape',
        onClick: (priorSelection) =>
          priorSelection.selectionType === 'handshape'
            ? priorSelection
            : handshape.defaultSelection,
      },
      {
        glyph: (props) => (
          <ContactSelection
            {...props}
            isSelected={selection.selectionType === 'contact'}
          />
        ),
        hideCaption: true,
        // isSelected: selection.selectionType === 'contact',
        onClick: (priorSelection) =>
          priorSelection.selectionType === 'contact'
            ? priorSelection
            : contact.defaultSelection,
      },
    ];

    let glyphLayout: Array<Array<Array<GlyphButtonProps<GlyphSelection>>>> = [];

    switch (selection.selectionType) {
      case 'contact':
        glyphLayout = contact.KeyboardConfigurator.getGlyphLayout(
          selection
        ) as Array<Array<Array<GlyphButtonProps<GlyphSelection>>>>;
        break;
      case 'handshape':
        glyphLayout = handshape.KeyboardConfigurator.getGlyphLayout(
          selection
        ) as Array<Array<Array<GlyphButtonProps<GlyphSelection>>>>;
        break;
    }

    if (!glyphLayout.length)
      return [[...createEmptyPadding(10), selectionTypeOptions]];

    if (!glyphLayout[0].length)
      return [
        [...createEmptyPadding(10), selectionTypeOptions],
        ...glyphLayout.slice(1, glyphLayout.length),
      ];

    return [
      [
        ...glyphLayout[0],
        ...createEmptyPadding(
          10 - glyphLayout[0].flatMap((group) => group).length
        ),
        selectionTypeOptions,
      ],
      ...glyphLayout.slice(1, glyphLayout.length),
    ];
  }
}
