import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Routes,Route,Link} from 'react-router-dom'
import AddTask from './components/AddTask'
import Home from './components/Home'
import Grid from '@mui/material/Grid'
export default function App() {
  return (
    <div className="App">
    <AppBar sx={{background: 'black'}} position="static">
    <Toolbar>
<Grid container>
<Grid item xs={10}/>
<Grid item xs={1}>
    <Link to="/addtask" style={{color: 'white'}}>Add Task</Link>
</Grid>
<Grid item xs={1}>
    <Link to="/" style={{color: 'white'}} >List Tasks</Link>
</Grid>
</Grid>
    </Toolbar>
    </AppBar>

<Routes>
<Route path='/addtask' element={<AddTask/>}/>
<Route path='/' element={<Home/>}/>
</Routes>
    </div>
  );
}


