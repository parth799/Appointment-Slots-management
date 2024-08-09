/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/appointmentListSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface AppointmentSlot {
  id: string;
  slotTime: string;
  capacity: number;
  date: string;
}

interface AppointmentListState {
  rows: AppointmentSlot[];
  filteredRows: AppointmentSlot[];
  searchTerm: string;
  selectedDate: Dayjs | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppointmentListState = {
  rows: [],
  filteredRows: [],
  searchTerm: '',
  selectedDate: dayjs(),
  status: 'idle',
  error: null,
};

export const fetchAppointments:any = createAsyncThunk('appointments/fetchAppointments', async () => {
  try {
    const response = await axios.get('http://localhost:5157/appointments', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.flatMap((appointment: any) =>
      appointment.slots
        .filter((slot: any) => slot.capacity !== 0) // Filter out slots with capacity 0
        .map((slot: any) => ({
          id: slot._id,
          slotTime: `${dayjs(slot.startTime).format('hh:mm A')} - ${dayjs(slot.endTime).format('hh:mm A')}`,
          capacity: slot.capacity,
          date: dayjs(appointment.date).format('YYYY-MM-DD'),
        }))
    );
  } catch (error) {
    toast.error('Error fetching appointment slots.');
    throw error;
  }
});

export const deleteAppointment:any = createAsyncThunk(
  'appointments/deleteAppointment',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5157/appointments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Appointment slot deleted successfully.');
      return id;
    } catch (error:any) {
      toast.error('Error deleting appointment slot.');
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentListSlice = createSlice({
  name: 'appointmentList',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredRows = state.rows.filter((row) => {
        const isMatchingTerm = row.slotTime.toLowerCase().includes(state.searchTerm.toLowerCase());
        const isMatchingDate = state.selectedDate ? row.date === state.selectedDate.format('YYYY-MM-DD') : true;
        return isMatchingTerm && isMatchingDate;
      });
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      state.filteredRows = state.rows.filter((row) => {
        const isMatchingTerm = row.slotTime.toLowerCase().includes(state.searchTerm.toLowerCase());
        const isMatchingDate = state.selectedDate ? row.date === state.selectedDate.format('YYYY-MM-DD') : true;
        return isMatchingTerm && isMatchingDate;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rows = action.payload;
        state.filteredRows = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.rows = state.rows.filter((row) => row.id !== action.payload);
        state.filteredRows = state.filteredRows.filter((row) => row.id !== action.payload);
      });
  },
});

export const { setSearchTerm, setSelectedDate } = appointmentListSlice.actions;

export default appointmentListSlice.reducer;
