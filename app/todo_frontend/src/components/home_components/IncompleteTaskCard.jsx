import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const IncompleteTaskCard = () => {
  return (
    <Card
      sx={{
        width: "30%",
        display: "flex",
        padding: "10px",
        boxShadow: "3px 5px 10px",
        gap: "10px",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          background: "#f44336",
          borderRadius: "5px",
          ":hover": { cursor: "pointer", background: "#b0bec5" },
        }}
      >
        <Typography>Hello</Typography>
      </CardContent>
      <Box sx={{ display: "flex", gap: "5px" }}>
        <Button
          sx={{
            background: "#607d8b",
            color: "white",
            ":hover": { background: "#455a64" },
          }}
        >
          <EditIcon />
        </Button>
        <Button
          sx={{
            background: "#607d8b",
            color: "white",
            ":hover": { background: "#455a64" },
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Card>
  );
};

export default IncompleteTaskCard;
