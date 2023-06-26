import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const IncompleteTaskCard = ({ data, handleTaskForm, handleTaskData }) => {
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
        row.complete === false ? (
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
                background: "#e53935",
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
                <CheckIcon />
              </Button>
              <Button
                sx={{
                  background: "#607d8b",
                  color: "white",
                  ":hover": { background: "#455a64" },
                }}
                onClick={() => [
                  handleTaskForm(true, false),
                  handleTaskData({
                    user: row.user,
                    id: row.id,
                    title: row.title,
                    priority: row.priority,
                    description: row.description,
                  }),
                ]}
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
          </Box>
        ) : null
      )}
    </Card>
  );
};

export default IncompleteTaskCard;
