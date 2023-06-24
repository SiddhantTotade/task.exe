import React from "react";
import IncompleteTaskCard from "../components/home_components/IncompleteTaskCard";
import CompleteTaskCard from "../components/home_components/CompleteTaskCard";
import FormCard from "../components/home_components/FormCard";
import { Box } from "@mui/material";

const Home = () => {
  return (
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
      <CompleteTaskCard />
      <IncompleteTaskCard />
      <FormCard />
    </Box>
  );
};

export default Home;
