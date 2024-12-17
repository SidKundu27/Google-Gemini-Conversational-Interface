'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function App() {
  const [query, setQuery] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the query and file to the backend API
    const formData = new FormData();
    formData.append('query', query);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data); // Handle the AI response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI-Powered Document Assistant
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          component="label" // Allows the button to act as a file input trigger
          endIcon={<AttachFileIcon />}
        >
          Upload Document
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={!file || !query} // Disable submit if no file or query
      >
        Generate Response
      </Button>
    </Box>
  );
}

export default App;
