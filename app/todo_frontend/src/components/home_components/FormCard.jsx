import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, TextField, Typography } from "@mui/material";
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
import BackdropSpinner from "./Backdrop";
import SnackbarAlert from "./Snackbar";

const FormCard = ({ taskForm, taskData, handleTaskFormClose }) => {
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
    complete_before: "",
  });

  const [error, setError] = React.useState("");

  const handleValidation = () => {
    if (
      (formData.title ||
        formData.priority ||
        formData.description ||
        formData.complete_before) === ""
    ) {
      setError("All fields are required");
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
      complete_before: taskForm.new ? "" : taskData.complete_before,
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

  const handleChange = (e) => {
    setFormData({ ...formData, complete_before: e.target.value });
  };

  return (
    <>
      <>
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
                <Typography>
                  Are you sure you want to delete this task ?
                </Typography>
              )}
              {taskForm.complete ? (
                <Button
                  variant="contained"
                  onClick={() => [
                    updateTodo({
                      id: taskData.id,
                      access_token: access_token,
                      complete: "TRUE",
                    }),
                    handleTaskFormClose(),
                  ]}
                >
                  Yes
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => [
                    deleteTodo({
                      taskData: taskData,
                      access_token: access_token,
                    }),
                    handleTaskFormClose(),
                  ]}
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
                defaultValue={taskForm.new ? "" : formData.title}
              />
              <TextField
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                multiline
                rows={1}
                label="Priority : Between 1 - 5"
                defaultValue={taskForm.new ? "" : formData.priority}
              />
              <TextField
                label="Describe Task"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                multiline
                rows={4}
                defaultValue={taskForm.new ? "" : formData.description}
              />
              <TextField
                onChange={(e) => handleChange(e)}
                type="datetime-local"
                rows={1}
                value={taskForm.new ? null : formData.complete_before}
              />
              {taskForm.new ? (
                <Button
                  variant="contained"
                  onClick={() =>
                    handleValidation()
                      ? [
                          createTodo({
                            access_token: access_token,
                            formData: formData,
                          }),
                          setFormData({
                            title: "",
                            priority: "",
                            description: "",
                          }),
                          handleTaskFormClose(),
                        ]
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
                      ? [
                          updateTodo({
                            access_token: access_token,
                            formData: formData,
                            id: taskData.id,
                            complete: "FALSE",
                          }),
                          setFormData({
                            title: "",
                            priority: "",
                            description: "",
                            complete_before: "",
                          }),
                          handleTaskFormClose(),
                        ]
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
      </>
      {responseCreateTodo.isLoading ? (
        <BackdropSpinner isLoading={responseCreateTodo.isLoading} />
      ) : (
        ""
      )}
      {responseCreateTodo.isSuccess ? (
        <SnackbarAlert
          isSuccess={responseCreateTodo.isSuccess}
          msg={responseCreateTodo.data.data}
        />
      ) : (
        ""
      )}

      {responseUpdateTodo.isLoading ? (
        <BackdropSpinner isLoading={responseUpdateTodo.isLoading} />
      ) : (
        ""
      )}
      {responseUpdateTodo.isSuccess ? (
        <SnackbarAlert
          isSuccess={responseUpdateTodo.isSuccess}
          msg={responseUpdateTodo.data.data}
        />
      ) : (
        ""
      )}

      {responseDeleteTodo.isLoading ? (
        <BackdropSpinner isLoading={responseDeleteTodo.isLoading} />
      ) : (
        ""
      )}
      {responseDeleteTodo.isSuccess ? (
        <SnackbarAlert
          isSuccess={responseDeleteTodo.isSuccess}
          msg={responseDeleteTodo.data.data}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default FormCard;
