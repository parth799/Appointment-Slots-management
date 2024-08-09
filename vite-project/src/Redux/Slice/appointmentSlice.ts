/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';

interface AppointmentState {
  date: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  capacity: number;
  duration: number;
  bulkSlot: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppointmentState = {
  date: null,
  startTime: null,
  endTime: null,
  capacity: 0,
  duration: 15,
  bulkSlot: false,
  status: 'idle',
  error: null,
};

export const createAppointment = createAsyncThunk(
  'appointment/createAppointment',
  async (data: Omit<AppointmentState, 'status' | 'error'>, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5157/appointments', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('Appointment slots created successfully.');
        return response.data;
      } else {
        toast.error('Error creating appointment slots.');
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error('Error creating appointment slots.');
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setDate: (state:any, action:any) => {
      state.date = action.payload;
    },
    setStartTime: (state:any, action:any) => {
      state.startTime = action.payload;
    },
    setEndTime: (state:any, action:any) => {
      state.endTime = action.payload;
    },
    setCapacity: (state:any, action:any) => {
      state.capacity = action.payload;
    },
    setDuration: (state:any, action:any) => {
      state.duration = action.payload;
    },
    setBulkSlot: (state:any, action:any) => {
      state.bulkSlot = action.payload;
    },
    resetAppointment: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAppointment.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Somethingwent wrong@';
      });
  },
});

export const {
  setDate,
  setStartTime,
  setEndTime,
  setCapacity,
  setDuration,
  setBulkSlot,
  resetAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
