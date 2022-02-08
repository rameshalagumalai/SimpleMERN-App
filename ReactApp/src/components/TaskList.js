import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function TaskList ({tasks})
{

return(
<Box p={2}>
<Paper>
<Typography variant="h6" component="h2" >Task List</Typography>
<List component = "nav">
{tasks.map(task => (
<ListItem button divider key={task.taskItemId}>
    <ListItemText primary = {task.taskName}/>
</ListItem>
))}
</List>
</Paper>
</Box>
)

}