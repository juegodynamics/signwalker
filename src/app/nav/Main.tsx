import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box component="main" sx={{ p: 3, height: "100vh", overflow: "hidden" }}>
      <Toolbar />
      {children}
    </Box>
  );
}
