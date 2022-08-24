import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const GridLayout = ({
  values,
  size,
}: {
  values: [string, string, string, string];
  size?: "small" | "large";
}) => (
  <Grid container columnGap={0} rowGap={0} sx={{ pb: 2 }}>
    {values.map((value, index) => (
      <Grid item xs={6} key={index}>
        <Typography
          sx={{
            fontSize: size === "small" ? "1.5em" : "2em",
            color: "primary.dark",
            height: "1em",
          }}
        >
          {value}
        </Typography>
      </Grid>
    ))}
  </Grid>
);
