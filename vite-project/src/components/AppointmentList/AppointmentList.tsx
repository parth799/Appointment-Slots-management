/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, IconButton, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppointmentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);

  const shouldDisableDate = (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5157/appointments', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const fetchedRows = response.data.flatMap((appointment: any) =>
          appointment.slots
            .filter((slot: any) => slot.capacity !== 0) // Filter out slots with capacity 0
            .map((slot: any) => ({
              id: slot._id,
              slotTime: `${dayjs(slot.startTime).format('hh:mm A')} - ${dayjs(slot.endTime).format('hh:mm A')}`,
              capacity: slot.capacity,
              date: dayjs(appointment.date).format('YYYY-MM-DD'),
            }))
        );
        setRows(fetchedRows);
        setFilteredRows(fetchedRows);
      } catch (error) {
        console.error('Error fetching appointment slots:', error);
        toast.error('Error fetching appointment slots.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterRows();
  }, [searchTerm, selectedDate]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5157/appointments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      setFilteredRows(updatedRows);
      toast.success('Appointment slot deleted successfully.');
    } catch (error) {
      console.error('Error deleting appointment slot:', error);
      toast.error('Error deleting appointment slot.');
    }
  };

  const filterRows = () => {
    const filtered = rows.filter((row) => {
      const isMatchingTerm = row.slotTime.toLowerCase().includes(searchTerm.toLowerCase());
      const isMatchingDate = selectedDate ? row.date === selectedDate.format('YYYY-MM-DD') : true;
      return isMatchingTerm && isMatchingDate;
    });
    setFilteredRows(filtered);
  };

  const columns: GridColDef[] = [
    { field: 'slotTime', headerName: 'Slot Time', width: 400 },
    { field: 'capacity', headerName: 'Seating Capacity', width: 400 },
    {
      field: 'manage',
      headerName: 'Manage',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => console.log(`Edit appointment with id: ${params.row.id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <Typography variant="h4" align="center" gutterBottom className='text-cyan-700'>
          Appointment Slots
        </Typography>
      </nav>
      <br />
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <TextField
              label="Search Slot Time"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                shouldDisableDate={shouldDisableDate}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item style={{ marginLeft: "-200px", display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={filterRows}
              className="text-white bg-gradient-to-r shadow-lg dark:shadow-lg font-medium rounded-lg text-sm px-9 py-3.5 text-center"
              style={{
                fontSize: "20px",
                height: '56px',
                width: '100%',
                backgroundColor: 'rgba(37,221,133,1)',
                color: 'white',
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <div style={{ height: 631, width: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </Container>
    </>
  );
};

export default AppointmentsList;
