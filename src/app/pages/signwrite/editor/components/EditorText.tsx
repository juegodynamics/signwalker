import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import * as d from '../types';
import {EditorWord} from './EditorWord';

export const EditorText = ({text}: {text: d.Text}) => (
  <Paper variant="outlined" sx={{height: '50vh', width: '100%'}}>
    <Stack
      direction="column"
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="flex-start"
      alignContent="flex-start"
      sx={{height: '50vh'}}
    >
      {text.words.map((word, wordIndex) => (
        <EditorWord
          key={wordIndex}
          word={word}
          isFocused={text.currentWordIndex === wordIndex}
        />
      ))}
    </Stack>
  </Paper>
);
