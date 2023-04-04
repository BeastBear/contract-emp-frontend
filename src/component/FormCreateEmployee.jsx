import React, { useState, useEffect } from "react";
import {
 Box,
 TextField,
 Button,
 Typography,
 InputLabel,
 useTheme,
 Select,
 MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import ContractService from "../services/ContractService";
import Header from "./Header";
import FlexBetween from "./FlexBetween";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ArchiveService from "services/ArchiveService";
import CompanyService from "../services/CompanyService";
import swal from "sweetalert";

const CreateEmployees = () => {
 const theme = useTheme();
 const navigate = useNavigate();
 const [error, setError] = useState("");
 const [employeeName, setEmployeeName] = useState("");
 const [employeeSurname, setEmployeeSurname] = useState("");
 const [employeeNumber, setEmployeeNumber] = useState("");
 const [employeePhone, setEmployeePhone] = useState("");
 const [employeeNote, setEmployeeNote] = useState("");
 const [createdEmp, setCreatedEmp] = useState({});
 const [contractNumber, setContractNumber] = useState("");
 const [startDate, setStartDate] = useState("");
 const [endDate, setEndDate] = useState("");
 const [department1, setDepartment1] = useState("");
 const [department2, setDepartment2] = useState("");
 const [remark, setRemark] = useState("");
 const [contractList, setContractList] = useState([]);
 const [companyId, setCompanyId] = useState("");
 const [companyName, setCompanyName] = useState("");
 const [contractId, setContractId] = useState("");
 const [employeeId, setEmployeeId] = useState(0);

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
    swal("เพิ่มลูกจ้างสำเร็จ!", "success");
    console.log(response.data);
    setCreatedEmp(response.data.data);
    setEmployeeId(response.data.data.id);
    navigate("/employee");
    // try {
    //  console.log(response);
    //  let archiveData = {
    //   employee_id: employeeId,
    //   contract_id: contractId,
    //   department1: department1,
    //   department2: department2,
    //   remark: remark,
    //  };
    //  console.log(archiveData);
    //  const response = await ArchiveService.postArchive(archiveData);
    //  if (response.status === 200) {
    //   navigate("/employee");
    //  }
    // } catch (error) {
    //  console.error("Error:", error.response);
    //  setError(error.response.data.message);
    // }
    //create archive

    // navigate("/employee");
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

 const handleCancleClick = () => {
  navigate("/employee");
 };

 const handleContractSelect = async (event) => {
  const selectedContract = contractList.find(
   (contract) => contract.number === event.target.value
  );
  setContractNumber(selectedContract.number);
  setStartDate(selectedContract.start_date);
  setEndDate(selectedContract.end_date);
  setCompanyId(selectedContract.company_id);
  setContractId(selectedContract.id);

  try {
   const Companyresponse = await CompanyService.getCompanies(
    selectedContract.company_id
   );
   const index = selectedContract.company_id;
   setCompanyName(Companyresponse.data[index - 1].name); // update the state with the name
  } catch (error) {
   console.error("Error:", error.response);
   setError(error.response.data.message);
   setCompanyName("N/A");
  }
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
      <InputLabel>เลขที่สัญญา</InputLabel>
      <Select
       fullWidth
       margin="normal"
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
      <InputLabel>วันเริ่ม</InputLabel>
      <TextField fullWidth margin="normal" value={startDate} />
      <InputLabel>วันสิ้นสุด</InputLabel>

      <TextField fullWidth margin="normal" value={endDate} />
      <InputLabel>ชื่อบริษัท</InputLabel>
      <TextField fullWidth margin="normal" value={companyName} />
      <InputLabel>สังกัดกอง</InputLabel>
      <TextField
       fullWidth
       margin="normal"
       value={department1}
       onChange={(e) => setDepartment1(e.target.value)}
      />
      <InputLabel>สังกัดฝ่าย</InputLabel>
      <TextField
       fullWidth
       margin="normal"
       value={department2}
       onChange={(e) => setDepartment2(e.target.value)}
      />
      <InputLabel>หมายเหตุ</InputLabel>
      <TextField
       fullWidth
       margin="normal"
       value={remark}
       onChange={(e) => setRemark(e.target.value)}
      />
      <Box sx={{ mt: "1.5rem" }}>
       <Button type="submit" variant="contained" onClick={handleSubmit}>
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
     </Box>
    </form>
   </Box>
  </Box>
 );
};

export default CreateEmployees;
