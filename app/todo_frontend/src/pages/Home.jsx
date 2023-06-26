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

  const [taskForm, setTaskForm] = useState({
    new: false,
    open: false,
    delete: false,
    complete: false,
    completed: false,
  });

  const [taskData, setTaskData] = useState({});

  const handleTaskForm = (val_1, val_2, val_3, val_4, val_5) => {
    setTaskForm({
      open: val_1,
      new: val_2,
      delete: val_3,
      complete: val_4,
      completed: val_5,
    });
  };

  const handleTaskFormClose = () => {
    setTaskForm(false);
  };

  const handleTaskData = (data) => {
    setTaskData(data);
  };

  const [value, setValue] = React.useState("");
  const [dataSource, setDataSource] = React.useState(data);
  const [taskFilter, setTaskFilter] = React.useState([]);

  const handleSearch = (e) => {
    if (e !== "") {
      setValue(e);
      const filterTask = data.data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.toLowerCase())
        )
      );
      setTaskFilter([...filterTask]);
    } else {
      setValue(e);
      setDataSource([...dataSource]);
    }
  };

  return (
    <>
      <NavBar
        data={data}
        handleTaskForm={handleTaskForm}
        handleSearch={handleSearch}
      />
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
        <CompleteTaskCard
          data={value.length > 0 ? taskFilter : data.data}
          handleTaskForm={handleTaskForm}
          handleTaskData={handleTaskData}
        />
        <IncompleteTaskCard
          data={value.length > 0 ? taskFilter : data.data}
          handleTaskForm={handleTaskForm}
          handleTaskData={handleTaskData}
        />
        <FormCard
          taskForm={taskForm}
          taskData={taskData}
          handleTaskFormClose={handleTaskFormClose}
        />
      </Box>
    </>
  );
};

export default Home;
