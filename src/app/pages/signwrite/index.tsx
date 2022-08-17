import { SignKeyboard } from "./keyboard";

export default function SignWriter() {
  return <SignKeyboard />;
  // const [selectedRoot, setSelectedRoot] = React.useState<string | undefined>(undefined);

  // return (
  //   <Stack spacing={0} justifyContent="flex-start" alignItems="center" sx={{ height: "100%" }}>
  //     <Stack justifyContent="center" alignItems="center" sx={{ height: "50%" }}>
  //       <Typography variant="h1">{resolveKey({ selectedRoot })}</Typography>
  //     </Stack>
  //     <Stack spacing={0} direction="column" justifyContent="flex-start" sx={{ height: "30%" }}>
  //       <RootKeyboardRow selectedRoot={selectedRoot} setSelectedRoot={setSelectedRoot} />
  //     </Stack>
  //   </Stack>
  // );
}
