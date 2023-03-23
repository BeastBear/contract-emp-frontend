import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Company from './pages/Company';
import CreateCompany from 'pages/createCompany';
import UpdateCompany from 'pages/updateCompany'
import Contract from './pages/Contract'
import Archive from './pages/Archive'
import Employee from './pages/Employee'
import User from './pages/User'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import { useMemo } from 'react';
import MainLayout from './layouts/MainLayout';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company" element={<Company />} />
            <Route path="/createcompany" element={<CreateCompany/>}/>
            <Route path="/updatecompany/:id" element={<UpdateCompany/>}/>
            <Route path="/contract" element={<Contract />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
