import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import ContractService from "../services/ContractService";
import Header from "./Header";
import FlexBetween from "./FlexBetween";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ContractDataGrid from "../component/ContractDataGridInCreateEmployee";

const CreateEmployees = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSurname, setEmployeeSurname] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeNote, setEmployeeNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EmployeeService.postEmployee({
        name: employeeName,
        surname: employeeSurname,
        number: employeeNumber,
        telephone: employeePhone,
        note: employeeNote,
      });
      if (response.status === 200) {
        navigate("/employee");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancleClick = () => {
    navigate("/employee");
  };

  return (
    <Box>
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="เพิ่มพนักงาน" />
        </FlexBetween>
        <form onSubmit={handleSubmit}>
          <FlexBetween sx={{ mt: "1.5rem" }}>
            <Box sx={{ flex: "1" }}>
              <InputLabel>เลขประจำตัว*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                sx={{ width: "100%" }}
              />
              <InputLabel>ชื่อ*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>

            <Box sx={{ flex: "0 2rem" }}>
              <div></div>
            </Box>

            <Box sx={{ flex: "1" }}>
              <InputLabel>เบอร์โทรศัพท์*: </InputLabel>
              <TextField
                margin="normal"
                value={employeePhone}
                onChange={(e) => setEmployeePhone(e.target.value)}
                sx={{ width: "100%" }}
              />
              <InputLabel>นามสกุล*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeSurname}
                onChange={(e) => setEmployeeSurname(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
          </FlexBetween>

          <InputLabel>หมายเหตุ: </InputLabel>
          <TextField
            margin="normal"
            value={employeeNote}
            onChange={(e) => setEmployeeNote(e.target.value)}
            sx={{ width: "100%" }}
          />

          <Box sx={{ mt: "1.5rem" }}>
            <Button type="submit" variant="contained">
              เพิ่มพนักงาน
            </Button>

            <Button
              sx={{ ml: "10px" }}
              variant="outlined"
              onClick={handleCancleClick}
            >
              ยกเลิก
            </Button>
          </Box>

          {error && (
            <Typography color="error" variant="body1" sx={{ mt: "1rem" }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
      <ContractDataGrid />
    </Box>
  );
};

export default CreateEmployees;
