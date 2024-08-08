import { Home } from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavLink } from 'react-router-dom';

function AppointementSlote() {
  return (
    <>
      <nav className="flex justify-end items-center p-4 bg-white shadow-md">
        <div className="flex space-x-4">
          <div className="p-2 rounded hover:bg-cyan-100 flex items-center">
            <ListItemIcon>
              <Home />
              <ChevronRightIcon />
            </ListItemIcon>
          </div>
          <NavLink
            to="/groups"
            className="p-2 rounded hover:bg-cyan-100 text-cyan-700 flex items-center"
          >
            <ListItemText primary="Group" />
            <ChevronRightIcon />
          </NavLink>
          <div className="flex space-x-4">
            <ListItemButton
              className="p-2 rounded hover:bg-cyan-100 flex items-center"
            >
              <ListItemText primary="Appointment Slot" />
            </ListItemButton>
            
          </div>
        </div>
      </nav>

      <div className="flex flex-col space-y-2 p-4">
        <NavLink
          to="/create-appointment"
          className="p-2 rounded hover:bg-cyan-100 text-cyan-700 flex items-center"
        >
          Create Appointment Slot
        </NavLink>
        <NavLink
          to="/list-appointments"
          className="p-2 rounded hover:bg-cyan-100 text-cyan-700 flex items-center"
        >
          List Appointment Slot
        </NavLink>
      </div>
    </>
  )
}

export default AppointementSlote
