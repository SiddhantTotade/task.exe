import React, { useState } from "react";
import NavBar from "../components/home_components/NavBar";
import IncompleteTaskCard from "../components/home_components/IncompleteTaskCard";
import CompleteTaskCard from "../components/home_components/CompleteTaskCard";
import FormCard from "../components/home_components/FormCard";
import { Box } from "@mui/material";
import { getToken } from "../services/LocalStorageSerice";
import { useGetAllTasksQuery } from "../services/todoAPIs";

const Home = () => {
  const { access_token } = getToken();

  const { data = [], isLoading } = useGetAllTasksQuery(access_token);

  const completedTask = data.data?.map((row) => {
    return row.complete === true ? row : undefined;
  });

  const inCompletedTask = data.data?.map((row) => {
    return row.complete === false ? row : undefined;
  });

  console.log();

  const [taskForm, setTaskForm] = useState({
    new: false,
    open: false,
  });

  const [taskData, setTaskData] = useState({});

  const handleTaskForm = (val_1, val_2) => {
    setTaskForm({ open: val_1, new: val_2 });
  };

  const handleTaskData = (data) => {
    setTaskData(data);
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
        <CompleteTaskCard data={data.data} />
        <IncompleteTaskCard
          data={data.data}
          handleTaskForm={handleTaskForm}
          handleTaskData={handleTaskData}
        />
        <FormCard taskForm={taskForm} taskData={taskData} />
      </Box>
    </>
  );
};

export default Home;
