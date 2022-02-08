import Container from '@mui/material/Container';

import React from 'react';
import TaskList from "./TaskList";
import { useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function Home(){

  const [tasks, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
   fetchData();
  }, []);


const fetchData = () => {
 setTimeout(() => {
      fetch('http://localhost:28908/api/Task/tasks')
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
      })
      .catch(err => {
          // auto catches network / connection error
          setIsPending(false);
          setError('API call Error !!');
      })
    }, 1000);
}



return(
<Container maxWidth="sm">
      { error && <div>{ error }</div> }
      { tasks && <TaskList tasks={tasks} /> }

<Backdrop sx={{zIndex:100, color: '#fff'}} open = {isPending} >
<CircularProgress color = "inherit"/>
</Backdrop>

</Container>
)
}