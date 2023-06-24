import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";

const FormCard = () => {
  return (
    <Card
      sx={{
        width: "30%",
        display: "flex",
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
        <TextField label="Describe Task" multiline rows={3} maxRows={4} />
      </CardContent>
    </Card>
  );
};

export default FormCard;
