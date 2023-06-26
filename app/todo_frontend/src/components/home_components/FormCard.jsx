import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField } from "@mui/material";
import { getToken } from "../../services/LocalStorageSerice";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../services/todoAPIs";
import { useGetLoggedInUserQuery } from "../../services/userAuthAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../features/userSlice";

const FormCard = ({ taskForm, taskData }) => {
  const { access_token } = getToken();

  const [createTodo, responseCreateTodo] = useCreateTaskMutation();

  const [updateTodo, responseUpdateTodo] = useUpdateTaskMutation();

  const { data, isSuccess } = useGetLoggedInUserQuery(access_token);

  const myData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    user: myData ? myData.id : "",
    title: "",
    priority: "",
    description: "",
  });

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
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          label="Priority"
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
              createTodo({ access_token: access_token, formData: formData })
            }
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() =>
              updateTodo({
                access_token: access_token,
                formData: formData,
                id: taskData.id,
              })
            }
          >
            Update
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FormCard;
