/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Container, Grid, TextField, IconButton, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, deleteAppointment, setSearchTerm, setSelectedDate } from '../../Redux/Slice/appointmentListSlice';

const AppointmentsList: React.FC = () => {
  const dispatch = useDispatch();

  const { filteredRows, searchTerm, selectedDate, status } = useSelector((state:any) => state.appointmentList);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [dispatch, status]);

  // useEffect(() => {
  //   filterRows();
  // }, [searchTerm, selectedDate]);

  const handleDelete = (id: string) => {
    dispatch(deleteAppointment(id));
  };

  const shouldDisableDate = (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
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
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </Grid>
          <Grid item xs={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => dispatch(setSelectedDate(newValue))}
                shouldDisableDate={shouldDisableDate}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item style={{ marginLeft: "-200px", display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={() => dispatch(fetchAppointments())}
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
