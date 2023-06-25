import React, { useState } from "react";
import NavBar from "../components/home_components/NavBar";
import IncompleteTaskCard from "../components/home_components/IncompleteTaskCard";
import CompleteTaskCard from "../components/home_components/CompleteTaskCard";
import FormCard from "../components/home_components/FormCard";
import { Box } from "@mui/material";

const Home = () => {
  const [taskForm, setTaskForm] = useState({
    new: false,
    open: false,
  });

  const handleTaskForm = (val_1, val_2) => {
    setTaskForm({ open: val_1, new: val_2 });
  };

  return (
    <>
      <NavBar handleTaskForm={handleTaskForm} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: "10%",
          gap: "30px",
          border: "2pxx solid red",
        }}
      >
        <CompleteTaskCard />
        <IncompleteTaskCard handleTaskForm={handleTaskForm} />
        <FormCard taskForm={taskForm} />
      </Box>
    </>
  );
};

export default Home;
