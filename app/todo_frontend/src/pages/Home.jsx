import React, { useState } from "react";
import NavBar from "../components/home_components/NavBar";
import IncompleteTaskCard from "../components/home_components/IncompleteTaskCard";
import CompleteTaskCard from "../components/home_components/CompleteTaskCard";
import FormCard from "../components/home_components/FormCard";
import { Box } from "@mui/material";
import { getToken } from "../services/LocalStorageSerice";
import { useGetAllTasksQuery } from "../services/todoAPIs";
import BackdropSpinner from "../components/home_components/Backdrop";

const Home = () => {
  const { access_token } = getToken();

  const { data = [], isLoading } = useGetAllTasksQuery(access_token);

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
      const filterTask = data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.toLowerCase())
        )
      );
      const sortedTaskFilterData = [...filterTask].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      const groupedTaskFilterData = sortedTaskFilterData.reduce(
        (result, entry) => {
          const currentDate = entry.created;
          if (!result[currentDate]) {
            result[currentDate] = [];
          }
          result[currentDate].push(entry);
          return result;
        },
        {}
      );
      setTaskFilter(groupedTaskFilterData);
    } else {
      setValue(e);
      setDataSource([...dataSource]);
    }
  };

  return (
    <>
      <BackdropSpinner isLoading={isLoading} />
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
          top: "15%",
          gap: "30px",
          border: "2pxx solid red",
        }}
      >
        <CompleteTaskCard
          data={value.length > 0 ? taskFilter : groupedData}
          handleTaskForm={handleTaskForm}
          handleTaskData={handleTaskData}
        />
        <IncompleteTaskCard
          data={value.length > 0 ? taskFilter : groupedData}
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
