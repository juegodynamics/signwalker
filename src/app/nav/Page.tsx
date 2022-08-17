import Header from "./Header";
import Main from "./Main";
import Box from "@mui/material/Box";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ height: "100%" }}>
      <Header />
      <Main>{children}</Main>
    </Box>
  );
}
