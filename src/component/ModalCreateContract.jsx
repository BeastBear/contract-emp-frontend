import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContractService from "../services/ContractService";
import ArchiveService from "services/ArchiveService";

const CreateContractsModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department1, setDepartment1] = useState("");
  const [department2, setDepartment2] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [note, setNote] = useState("");
  const [contractList, setContractList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Contractresponse = await ContractService.postContract({
        number: contractNumber,
        start_date: startDate,
        end_date: endDate,
      });
      const Archiveresponse = await ArchiveService.postArchive({
        department1: department1,
        department2: department2,
      });
      if (Contractresponse.status && Archiveresponse === 200) {
        onClose();
        navigate("/contract");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseContract = await ContractService.getContracts();
      setContractList(responseContract.data);
    };
    fetchData();
  }, []);

  const handleContractSelect = (event) => {
    const selectedContract = contractList.find(
      (contract) => contract.number === event.target.value
    );
    setContractNumber(selectedContract.number);
    setStartDate(selectedContract.start_date);
    setEndDate(selectedContract.end_date);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Contract</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: "1.5rem" }}>
          <form onSubmit={handleSubmit}>
            <Select
              fullWidth
              margin="normal"
              label="Contract Number"
              value={contractNumber}
              onChange={handleContractSelect}
            >
              {contractList && contractList.length > 0 ? (
                contractList.map((contract) => (
                  <MenuItem key={contract.id} value={contract.number}>
                    {contract.number}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No contracts found</MenuItem>
              )}
            </Select>
            <TextField
              fullWidth
              margin="normal"
              label="Start Date"
              value={startDate}
            />

            <TextField
              fullWidth
              margin="normal"
              label="End Date"
              value={endDate}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Department 1"
              value={department1}
              onChange={(e) => setDepartment1(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Department 2"
              value={department2}
              onChange={(e) => setDepartment2(e.target.value)}
            />

            {error && (
              <Typography color="error" variant="body1" sx={{ mt: "1rem" }}>
                {error}
              </Typography>
            )}
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateContractsModal;
