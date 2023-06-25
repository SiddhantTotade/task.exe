import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const NavBar = () => {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              border: "1px solid white ",
              display: "flex",
              gap: "5px",
              alignItems: "flex-start",
            }}
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
