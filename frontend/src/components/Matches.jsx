import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";

const Matches = () => {
  return (
    <Box display={{ xs: "block", md: "flex" }} justifyContent="center">
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      ></Stack>
    </Box>
  );
};

export default Matches;
