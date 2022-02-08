import Container from '@mui/material/Container';

import React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


export default function AddTask(){

const [taskName, setTaskName] = useState('');

const [open, setOpen] = useState(false);

const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    const task = { taskName };

    fetch('http://localhost:28908/api/task/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(() => {
        setOpen(true); 
    })
    .catch(err => {
    })
  }  


return(
<Container maxWidth="sm">
<Box m={4}>
<Paper>
<Typography variant="h6" component="h2">Add Task</Typography>
<Divider />
  <form onSubmit={handleSubmit}>
<Grid container direction="column">
 <Grid item>
           <Box m={2}> <TextField size="small" label="Task name" variant="outlined" required={true} onChange={(e) => setTaskName(e.target.value)}/>
            </Box>
</Grid>
<Grid item>
            <Box m={2}><Button type="submit" variant="outlined" >Submit</Button>
            </Box>
</Grid>
</Grid>
  </form>
</Paper>
</Box>
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Task Added"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
</Container>
)
}