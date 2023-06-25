import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const NavBar = ({ handleTaskForm }) => {
  return (
    <Box>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "unset",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography fontSize={30}>ToDo</Typography>
        <Toolbar>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              border: "1px solid white ",
              display: "flex",
              gap: "5px",
              alignItems: "flex-start",
              ":hover": {
                background: "#1565c0",
                border: "1px solid white",
              },
            }}
            onClick={() => handleTaskForm(true, true)}
          >
            New Task
            <AddIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
