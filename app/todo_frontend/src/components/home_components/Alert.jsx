import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AlertError = ({ error }) => {
  return (
    <Stack
      sx={{ width: "30%", position: "absolute", right: 45, bottom: "-70px" }}
      spacing={2}
    >
      <Alert severity="error">{error}</Alert>
    </Stack>
  );
};

export default AlertError;
