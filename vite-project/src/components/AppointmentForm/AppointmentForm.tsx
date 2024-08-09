/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box, ListItemIcon, ListItemText, ListItemButton, FormControl, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { NavLink } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { createAppointment } from '../../Redux/Slice/appointmentSlice';

const AppointmentForm: React.FC = () => {
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [capacity, setCapacity] = useState<number>(0);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [bulkSlot, setBulkSlot] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(15);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!date) {
      toast.error('Please select a date.');
      return;
    }
    if (!startTime || !endTime) {
      toast.error('Please select both start and end times.');
      return;
    }
    if (capacity <= 0) {
      toast.error('Please enter a valid seating capacity.');
      return;
    }
    if (duration <= 0) {
      toast.error('Please select a valid duration.');
      return;
    }
    if (startTime > endTime) {
      toast.error('End time must be greater than start time.');
      return;
    }

    const data = {
      date: date?.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      capacity,
      duration,
    };

    dispatch(createAppointment({ date, startTime, endTime, capacity, duration, bulkSlot })).then((result:any) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/list-appointments');
      }
    });
  };

  const shouldDisableDate = (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleCancel = () => {
    // state
    setStartTime(null);
    setEndTime(null);
    setCapacity(0);
    setDate(dayjs());
    setBulkSlot(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-white shadow-md">
        <Typography variant="h4" align="center" gutterBottom className='text-cyan-700'>
          Create Appointment Slots
        </Typography>

        <div className="flex space-x-4">
          <div className="p-2 rounded hover:bg-cyan-100 flex items-center">
            <ListItemIcon>
              <Home />
              <ChevronRightIcon />
            </ListItemIcon>
          </div>
          <NavLink
            to="/groups"
            className="p-2 rounded hover:bg-cyan-100 flex items-center"
          >
            <ListItemText primary="Group" />
            <ChevronRightIcon />
          </NavLink>
          <div className="flex space-x-4">
            <ListItemButton
              className="p-2 rounded hover:bg-cyan-100 flex items-center"
            >
              <NavLink
                to="/appointementSlote"
                className="p-2 rounded hover:bg-cyan-100 flex items-center"
              >
                Appointment Slot
              </NavLink>
              <ChevronRightIcon />
            </ListItemButton>
            <NavLink
              to="/create-appointment"
              className="p-2 rounded hover:bg-cyan-100 text-cyan-700 flex items-center"
            >
              Create Appointment Slot
            </NavLink>
          </div>
        </div>
      </nav>
      <br />

      <nav className="flex justify-start space-x-4 mb-5">
        <Button
          onClick={() => setBulkSlot(true)}
          className={`p-2 rounded ${bulkSlot ? 'bg-cyan-500 text-white' : 'hover:bg-cyan-100'}`}
        >
          Create Bulk 15 Min. Slots
        </Button>
        <Button
          onClick={() => setBulkSlot(false)}
          className={`p-2 rounded ${!bulkSlot ? 'bg-cyan-500 text-white' : 'hover:bg-cyan-100'}`}
        >
          Create One Slot
        </Button>
      </nav>
      <br />

      <Container className='m-0'>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              1. Select Date of Appointment
            </Typography>
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                shouldDisableDate={shouldDisableDate}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              2. Select Time Range
            </Typography>
            <br />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography gutterBottom className='fontext-sm'>
              3. Choose Seating Capacity
            </Typography>
            <br />
            <br />
            <TextField
              label="Seating Capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              inputProps={{ min: 1 }}
            />
            <br />
            <br />
            <br />
            <Typography gutterBottom className='fontext-sm'>
              4. Choose Slot Duration
            </Typography>
            <br />
            <FormControl >
              <Select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={45}>45 minutes</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'start', gap: 3, mt: 3 }}>
          <Button onClick={handleCancel} className='border-2 border-sky-500'>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create Slots
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AppointmentForm;
