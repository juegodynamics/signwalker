import Stack from '@mui/material/Stack';
import Header from './Header';
import Main from './Main';

export default function Page({children}: {children: React.ReactNode}) {
  return (
    <Stack direction="column" sx={{height: '100%'}}>
      <Header />
      <Main>{children}</Main>
    </Stack>
  );
}
