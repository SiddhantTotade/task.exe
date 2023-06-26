import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const IncompleteTaskCard = ({ data, handleTaskForm, handleTaskData }) => {
  const colors = [
    "",
    "rgb(127 29 29)",
    "rgb(153 27 27)",
    "rgb(185 28 28)",
    "rgb(220 38 38)",
    "rgb(239 68 68)",
  ];

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
                background: colors[row.priority],
                borderRadius: "5px",
                color: "white",
                ":hover": { cursor: "pointer", background: "#b0bec5" },
              }}
              onClick={() => [
                handleTaskForm(true, false, false, false, false),
                handleTaskData({
                  user: row.user,
                  id: row.id,
                  title: row.title,
                  priority: row.priority,
                  description: row.description,
                }),
              ]}
            >
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {row.title} : {row.description}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Button
                sx={{
                  background: "#607d8b",
                  color: "white",
                  ":hover": { background: "#455a64" },
                }}
                onClick={() => [
                  handleTaskForm(true, false, false, true, false),
                  handleTaskData({ id: row.id }),
                ]}
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
                  handleTaskForm(true, false, false, false, false),
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
                onClick={() => [
                  handleTaskForm(true, false, true, false, false),
                  handleTaskData({ id: row.id }),
                ]}
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
