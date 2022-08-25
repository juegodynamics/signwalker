import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

export default function Main({children}: {children: React.ReactNode}) {
  return (
    <Stack component="main" sx={{p: 3, height: '100vh', overflow: 'hidden'}}>
      <Toolbar />
      {children}
    </Stack>
  );
}
