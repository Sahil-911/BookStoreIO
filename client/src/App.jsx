import React from "react";
import {AppBar, Toolbar, Typography, Box, Container, Paper } from "@mui/material";
import FileInput from "./FileInput";

function App() {
  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book Store IO
          </Typography>
        </Toolbar>
      </AppBar>

    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Excel Upload
        </Typography>
        <Typography variant="h5" gutterBottom>
          Instructions for Excel Upload
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please ensure that your Excel file meets the following criteria:
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            1. The first column should contain the <strong>Name</strong>. 
            Each value must be a non-empty string (book name).
          </Typography>
          <Typography variant="body2">
            2. The second column should contain the <strong>ISBNCode</strong>. 
            The ISBN must be a valid code, formatted as a series of digits and hyphens.
          </Typography>
          <Typography variant="body2">
            3. The third column should contain the <strong>Author Id</strong>.
            Each value must be a non-empty string.
          </Typography>
          <Typography variant="body2">
            4. The fourth column should contain the <strong>Author</strong>. 
            Each value must be a non-empty string (Author&apos;s name).
          </Typography>
          <Typography variant="body2">
            5. The fifth column should contain the <strong>Author Email</strong>. 
            Each email address must be a valid format, e.g., example@example.com.
          </Typography>
          <Typography variant="body2">
            6. The sixth column should contain the <strong>Date of Birth</strong>. 
            The date must be in the format `DD-MM-YYYY`, e.g., 15-09-2004.
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <FileInput />
        </Box>
      </Paper>
    </Container>
    </>
  );
}

export default App;
