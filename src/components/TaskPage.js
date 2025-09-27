import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, toggleTask, deleteTask } from '../features/tasks/taskSlice';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, AppBar, Toolbar, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Switch, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskPage() {
  const dispatch = useDispatch();
  const tasksState = useSelector(s => s.tasks);
  const auth = useSelector(s => s.auth);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // modal state
  const [title, setTitle] = useState('');
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  useEffect(() => {
    if (!auth.isAuthenticated) { navigate('/'); return; }
    dispatch(fetchTasks());
  }, [dispatch, auth.isAuthenticated, navigate]);

  function handleOpen() { setOpen(true); }
  function handleClose() { setOpen(false); setTitle(''); }

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) {
      setAlert({ open: true, type: 'error', message: 'Task title required!' });
      return;
    }
    try {
      await dispatch(addTask(title)).unwrap();
      setAlert({ open: true, type: 'success', message: 'Task added successfully!' });
      handleClose();
      dispatch(fetchTasks()); // refresh list
    } catch (err) {
      setAlert({ open: true, type: 'error', message: err || 'Failed to add task' });
    }
  }

  function handleToggle(id) { dispatch(toggleTask(id)); }
  function handleDelete(id) { dispatch(deleteTask(id)); }
  function handleLogout() { dispatch(logout()); navigate('/'); }

  return (
    <>
      {/* Top bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Task Manager</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 2 }}>
          {/* Header with Add Button */}
          <Typography variant="h5" sx={{ display: 'inline-block' }}>Task List</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ float: 'right' }}
            onClick={handleOpen}
          >
            Add Task
          </Button>
        </Paper>

        {/* Table */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="right"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksState.items.map(task => (
                <TableRow key={task._id}>
                  <TableCell
                    sx={{
                      textDecoration: task.status === 'Completed' ? 'line-through' : 'none'
                    }}
                  >
                    {task.title}
                  </TableCell>
                  <TableCell>
                    {task.status}
                  </TableCell>
                  <TableCell align="right">
                    <Switch
                      checked={task.status === 'Completed'}
                      onChange={() => handleToggle(task._id)}
                      color="success"
                      disabled={task.status === 'Completed'}
                    />
                    <IconButton onClick={() => handleDelete(task._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Add Task Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth 
            label="Task Title"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.type}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}
