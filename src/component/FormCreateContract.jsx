import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContractService from "../services/ContractService";
import Header from "./Header";
import FlexBetween from "./FlexBetween";

const CreateContracts = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [contractName, setContractName] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [contractPhone, setContractPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ContractService.postContract({
        name: contractName,
        address: contractAddress,
        telephone: contractPhone,
      });
      if (response.status === 200) {
        navigate("/contract");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancleClick = () => {
    navigate("/contract");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="CREATE CONTRACT" subtitle="Create new contract" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Contract Name"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
            helperText=""
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contract Address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contract Phone"
            value={contractPhone}
            onChange={(e) => setContractPhone(e.target.value)}
          />
          <Box sx={{ mt: "1.5rem" }}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button
              sx={{ ml: "10px" }}
              variant="outlined"
              onClick={handleCancleClick}
            >
              Cancel
            </Button>
          </Box>
          {error && (
            <Typography color="error" variant="body1" sx={{ mt: "1rem" }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default CreateContracts;
