import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CompleteTaskCard = ({ handleTaskData, handleTaskForm, data }) => {
  const colors = [
    "",
    "rgb(5 46 22)",
    "rgb(20 83 45)",
    "rgb(22 101 52)",
    "rgb(21 128 61)",
    "rgb(22 163 74)",
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
      {Object.entries(data).map(([created, entries]) => {
        return (
          <React.Fragment key={created}>
            {entries ? (
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography>Created : {created}</Typography>
                <Typography>Completed : {created}</Typography>
              </Box>
            ) : (
              ""
            )}
            {Array.isArray(entries)
              ? entries.map((entry) =>
                  entry.complete === true ? (
                    <Box
                      key={entry.id}
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
                          background: colors[entry.priority],
                          borderRadius: "5px",
                          color: "white",
                          ":hover": {
                            cursor: "pointer",
                            background: "#315e3d",
                          },
                        }}
                        onClick={() => [
                          handleTaskForm(true, false, false, false, false),
                          handleTaskData({
                            user: entry.user,
                            id: entry.id,
                            title: entry.title,
                            priority: entry.priority,
                            description: entry.description,
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
                          {entry.title} : {entry.description}
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
                            handleTaskForm(true, false, true, false, false),
                            handleTaskData({ id: entry.id }),
                          ]}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </Box>
                  ) : null
                )
              : null}
          </React.Fragment>
        );
      })}
    </Card>
  );
};

export default CompleteTaskCard;
