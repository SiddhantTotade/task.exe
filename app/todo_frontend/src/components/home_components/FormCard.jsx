import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField } from "@mui/material";
import { getToken } from "../../services/LocalStorageSerice";
import { useCreateTaskMutation } from "../../services/todoAPIs";

const FormCard = ({ taskForm }) => {
  const { access_token } = getToken();

  const [createTodo, responseCreateTodo] = useCreateTaskMutation();

  const [formData, setFormData] = React.useState({
    title: "",
    priority: "",
    description: "",
  });

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
          sx={{ width: "100%" }}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          label="Title"
        />
        <TextField
          sx={{ width: "100%" }}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          label="Priority"
        />
        <TextField
          label="Describe Task"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          multiline
          rows={7}
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
          <Button variant="contained">Update</Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FormCard;
