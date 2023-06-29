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
import { useGetLoggedInUserQuery } from "../../services/userAuthAPI";
import { getToken } from "../../services/LocalStorageSerice";

const NavBar = ({ handleTaskForm, handleSearch }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(unsetUserToken({ access_token: null }));
    dispatch(unsetUserInfo({ name: "", email: "" }));
    removeToken();
    navigate("/api/login");
  };

  const { access_token } = getToken();

  const { data, isSuccess } = useGetLoggedInUserQuery(access_token);

  return (
    <Box>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "unset",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ marginLeft: "100px" }} fontSize={30}>
          TODO
        </Typography>
        <Box
          sx={{
            position: "absolute",
            right: "25px",
            top: "80px",
            color: "blue",
            borderRadius: "5px",
            border: "2px solid blue",
            padding: "10px",
          }}
        >
          {data ? data.name : ""}
        </Box>
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
            "& .MuiInputLabel-root": { color: "yellow" },
            "&:hover .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "yellow" },
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
