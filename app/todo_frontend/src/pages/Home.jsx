import React, { useState } from "react";
import NavBar from "../components/home_components/NavBar";
import IncompleteTaskCard from "../components/home_components/IncompleteTaskCard";
import CompleteTaskCard from "../components/home_components/CompleteTaskCard";
import FormCard from "../components/home_components/FormCard";
import { Box } from "@mui/material";
import { getToken } from "../services/LocalStorageSerice";
import { useGetAllTasksQuery } from "../services/todoAPIs";
// import {
//   useCreateTaskMutation,
//   useUpdateTaskMutation,
// } from "../services/todoAPIs";
// import { useGetLoggedInUserQuery } from "../services/userAuthAPI";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserInfo } from "../features/userSlice";

const Home = () => {
  const { access_token } = getToken();

  const { data = [], isLoading } = useGetAllTasksQuery(access_token);

  const [taskForm, setTaskForm] = useState({
    new: false,
    open: false,
    delete: false,
    complete: false,
  });

  const [taskData, setTaskData] = useState({});

  const handleTaskForm = (val_1, val_2, val_3, val_4) => {
    setTaskForm({ open: val_1, new: val_2, delete: val_3, complete: val_4 });
  };

  const handleTaskData = (data) => {
    setTaskData(data);
  };

  // const [updateData, setUpdateData] = React.useState(taskData);

  // const [createTodo, responseCreateTodo] = useCreateTaskMutation();

  // const [updateTodo, responseUpdateTodo] = useUpdateTaskMutation();

  // const { data, isSuccess } = useGetLoggedInUserQuery(access_token);

  // const myData = useSelector((state) => state.user);

  // const dispatch = useDispatch();

  // const [formData, setFormData] = React.useState({
  //   user: myData ? myData.id : "",
  //   title: "",
  //   priority: "",
  //   description: "",
  // });

  // React.useEffect(() => {
  //   if (data && isSuccess) {
  //     dispatch(
  //       setUserInfo({ id: data.id, email: data.email, name: data.name })
  //     );
  //     setFormData({ ...formData, user: myData.id });
  //   }
  // }, [data, isSuccess, myData.id, dispatch]);

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
