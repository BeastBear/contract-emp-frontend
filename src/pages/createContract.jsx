import React, { useEffect } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import FormCreateContract from "component/FormCreateContract";

function Contracts() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      UserService.getUserInfo()
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);

  return (
    <Box>
      <FormCreateContract />
    </Box>
  );
}

export default Contracts;