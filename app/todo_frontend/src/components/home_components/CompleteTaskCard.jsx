import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CompleteTaskCard = ({ data }) => {
  return (
    <Card
      sx={{
        width: "30%",
        display: "flex",
        height: "50vh",
        overflow: "auto",
        flexDirection: "column",
        padding: "10px",
        boxShadow: "3px 5px 10px",
        gap: "10px",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      {data?.map((row, i) =>
        row.complete === true ? (
          <Box
            key={i}
            sx={{
              display: "flex",
              height: "6vh",
              gap: "10px",
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                background: "#1b5e20",
                color: "white",
                borderRadius: "5px",
                ":hover": { cursor: "pointer", background: "#b0bec5" },
              }}
            >
              <Typography>{row.title}</Typography>
            </CardContent>
            <Box sx={{ display: "flex", gap: "5px" }}>
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
          </Box>
        ) : null
      )}
    </Card>
  );
};

export default CompleteTaskCard;
