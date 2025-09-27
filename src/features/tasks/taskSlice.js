import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/tasks');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || err.message);
  }
});

export const addTask = createAsyncThunk('tasks/add', async (title, { rejectWithValue }) => {
  try {
    const res = await api.post('/tasks', { title });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || err.message);
  }
});

export const toggleTask = createAsyncThunk('tasks/toggle', async (id, { rejectWithValue }) => {
  try {
    const res = await api.put(`/tasks/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || err.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/tasks/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || err.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchTasks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(addTask.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(addTask.rejected, (state, action) => { state.error = action.payload; })

      .addCase(toggleTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(toggleTask.rejected, (state, action) => { state.error = action.payload; })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => { state.error = action.payload; });
  }
});

export default taskSlice.reducer;
