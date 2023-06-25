import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField } from "@mui/material";

const FormCard = ({ taskForm }) => {
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
        <TextField sx={{ width: "100%" }} label="Title" />
        <TextField sx={{ width: "100%" }} label="Priority" />
        <TextField label="Describe Task" multiline rows={7} maxRows={8} />
        {taskForm.new ? (
          <Button variant="contained">Save</Button>
        ) : (
          <Button variant="contained">Update</Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FormCard;
