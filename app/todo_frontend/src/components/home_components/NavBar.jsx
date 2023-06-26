import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { unsetUserInfo } from "../../features/userSlice";
import { unsetUserToken } from "../../features/authSlice";
import { removeToken } from "../../services/LocalStorageSerice";
import { useNavigate } from "react-router-dom";

const NavBar = ({ handleTaskForm, handleSearch }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(unsetUserToken({ access_token: null }));
    dispatch(unsetUserInfo({ name: "", email: "" }));
    removeToken();
    navigate("/api/login");
  };
  return (
    <Box>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "unset",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography fontSize={30}>TODO</Typography>
        <TextField
          id="outlined-search"
          size="small"
          InputLabelProps={{ style: { color: "white" } }}
          inputProps={{
            style: {
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "medium",
            },
          }}
          sx={{
            width: "30%",
            "& .MuiInputLabel-root": { color: "white" },
            "&:hover .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "white" },
            },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "white" },
            },
          }}
          label="Search"
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Toolbar sx={{ display: "flex", gap: "10px" }}>
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
            onClick={() => handleLogout()}
          >
            Logout
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
