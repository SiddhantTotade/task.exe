import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const IncompleteTaskCard = ({
  data,
  taskFilter,
  value,
  handleTaskForm,
  handleTaskData,
}) => {
  const colors = [
    "",
    "rgb(127 29 29)",
    "rgb(153 27 27)",
    "rgb(185 28 28)",
    "rgb(220 38 38)",
    "rgb(239 68 68)",
  ];

  const sortedData = [...data].sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  const groupedData = sortedData.reduce((result, entry) => {
    const currentDate = entry.created;
    if (!result[currentDate]) {
      result[currentDate] = [];
    }
    result[currentDate].push(entry);
    return result;
  }, {});

  const current_date_time = new Date();

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
      {Object.entries(value ? taskFilter : groupedData).map(
        ([created, entries]) => {
          return (
            <React.Fragment key={created}>
              <Typography
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {new Date(created).toLocaleDateString("en-IN")}
              </Typography>
              {Array.isArray(entries)
                ? entries.map((entry) =>
                    entry.complete === false ? (
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
                              background: "#962428",
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
                              complete_before: entry.complete_before,
                            }),
                          ]}
                        >
                          {current_date_time >
                          new Date(entry.complete_before) ? (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "end",
                                fontSize: "8px",
                                marginTop: "-10px",
                                marginRight: "-10px",
                              }}
                            >
                              &#128993;
                            </Box>
                          ) : (
                            ""
                          )}
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
                              handleTaskForm(true, false, false, true, false),
                              handleTaskData({ id: entry.id }),
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
                                user: entry.user,
                                id: entry.id,
                                title: entry.title,
                                priority: entry.priority,
                                description: entry.description,
                                complete_before: entry.complete_before,
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
        }
      )}
    </Card>
  );
};

export default IncompleteTaskCard;
