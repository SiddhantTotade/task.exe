import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const TodoCard = () => {
  return (
    <Card
      sx={{
        width: "30%",
        position: "absolute",
        top: "30%",
        left: "35%",
        padding: "10px",
        transform: "-50% -50%",
        boxShadow: "0px 0px 5px 5px",
      }}
    >
      <CardContent
        sx={{
          background: "#cfd8dc",
          borderRadius: "5px",
          ":hover": { cursor: "pointer", background: "#b0bec5" },
        }}
      >
        Hello
      </CardContent>
    </Card>
  );
};

export default TodoCard;
