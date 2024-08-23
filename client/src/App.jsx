import React from "react";
import { AppBar, Toolbar, Typography, Box, Paper, Container, Grid } from "@mui/material";
import FileInput from "./FileInput";

function App() {
  return (
    <>
      {/* Header Section */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Excel File Uploader
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Instructions Section */}
          <Typography variant="h5" gutterBottom>
            Instructions for Excel Upload
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please upload an Excel file in the following format:
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              1. The first column should contain the <strong>Author Name</strong>.
            </Typography>
            <Typography variant="body2">
              2. The second column should contain the <strong>Author Email</strong>.
            </Typography>
            <Typography variant="body2">
              3. The third column should contain the <strong>ISBN Code</strong>.
            </Typography>
            <Typography variant="body2">
              4. The fourth column should contain the <strong>Book Title</strong>.
            </Typography>
            <Typography variant="body2">
              5. The fifth column should contain the <strong>Date of Birth</strong> (in "YYYY-MM-DD" format).
            </Typography>
          </Box>

          {/* File Input */}
          <Box sx={{ mt: 4 }}>
            <FileInput />
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default App;
