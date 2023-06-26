import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, Typography } from "@mui/material";
import { getToken } from "../../services/LocalStorageSerice";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../services/todoAPIs";
import { useGetLoggedInUserQuery } from "../../services/userAuthAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../features/userSlice";
import AlertError from "./Alert";

const FormCard = ({ taskForm, taskData }) => {
  const { access_token } = getToken();

  const [createTodo, responseCreateTodo] = useCreateTaskMutation();

  const [updateTodo, responseUpdateTodo] = useUpdateTaskMutation();

  const [deleteTodo, responseDeleteTodo] = useDeleteTaskMutation();

  const { data, isSuccess } = useGetLoggedInUserQuery(access_token);

  const myData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    user: myData ? myData.id : "",
    title: "",
    priority: "",
    description: "",
  });

  const [error, setError] = React.useState("");

  const handleValidation = () => {
    if ((formData.title || formData.priority || formData.description) === "") {
      setError("All fields are required");
      console.log("Hello");
      return false;
    }

    if (formData.priority > "5" || formData.priority < "1") {
      setError("Please insert values between 1 - 5");
      return false;
    }

    return true;
  };

  React.useEffect(() => {
    setFormData({
      ...formData,
      title: taskForm.new ? "" : taskData.title,
      priority: taskForm.new ? "" : taskData.priority,
      description: taskForm.new ? "" : taskData.description,
    });
  }, [taskData.title, taskForm.new, taskData.priority, taskData.description]);

  React.useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({ id: data.id, email: data.email, name: data.name })
      );
      setFormData({ ...formData, user: myData.id });
    }
  }, [data, isSuccess, myData.id, dispatch]);

  return (
    <Card
      sx={{
        width: "30%",
        display: taskForm.open ? "flex" : "none",
        padding: "10px",
        boxShadow: "3px 5px 10px",
        gap: "10px",
      }}
    >
      {taskForm.delete || taskForm.complete ? (
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            gap: "20px",
          }}
        >
          {taskForm.complete ? (
            <Typography>Have you completed this task ?</Typography>
          ) : (
            <Typography>Are you sure you want to delete this task ?</Typography>
          )}
          {taskForm.complete ? (
            <Button
              variant="contained"
              onClick={() =>
                updateTodo({
                  id: taskData.id,
                  access_token: access_token,
                  complete: "TRUE",
                })
              }
            >
              Yes
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                deleteTodo({ taskData: taskData, access_token: access_token })
              }
            >
              Delete
            </Button>
          )}
        </CardContent>
      ) : (
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            gap: "20px",
          }}
        >
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            label="Title"
            multiline
            rows={1}
            defaultValue={taskForm.new ? "" : taskData.title}
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            multiline
            rows={1}
            label="Priority : Between 1 - 5"
            defaultValue={taskForm.new ? "" : taskData.priority}
          />
          <TextField
            label="Describe Task"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            multiline
            rows={7}
            defaultValue={taskForm.new ? "" : taskData.description}
          />
          {taskForm.new ? (
            <Button
              variant="contained"
              onClick={() =>
                handleValidation()
                  ? createTodo({
                      access_token: access_token,
                      formData: formData,
                    })
                  : ""
              }
            >
              Save
            </Button>
          ) : taskForm.completed ? (
            ""
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                handleValidation()
                  ? updateTodo({
                      access_token: access_token,
                      formData: formData,
                      id: taskData.id,
                      complete: "FALSE",
                    })
                  : ""
              }
            >
              Update
            </Button>
          )}
        </CardContent>
      )}
      {error ? <AlertError error={error} /> : ""}
    </Card>
  );
};

export default FormCard;
