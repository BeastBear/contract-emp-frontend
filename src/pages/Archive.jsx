import React, { useEffect } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import Header from '../component/Header';
import FlexBetween from 'component/FlexBetween';
import { useTheme } from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';

function Archive() {
  const navigate = useNavigate();
  const theme = useTheme()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      UserService.getUserInfo()
        .then(() => {
         
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ARCHIVE" subtitle="Archive dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Create Archive
          </Button>
        </Box>
      </FlexBetween>
    </Box>
  );
}

export default Archive;
