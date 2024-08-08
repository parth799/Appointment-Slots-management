// src/components/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { ListItemText, ListItemIcon } from "@mui/material";
import { Home } from "@mui/icons-material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const GroupNavbar: React.FC = () => {
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
          
          <NavLink
            to="/appointementSlote"
            className="p-2 rounded hover:bg-cyan-100 flex items-center"
          >
            Create Appointment Slot
          </NavLink>
          
        </div>
      </div>
    </nav>
    <br /><br />

    <div className="flex space-x-4">
          
          <NavLink
            to="/appointementSlote"
            className="p-2 rounded hover:bg-cyan-100 flex items-center"
          >
            Create Appointment Slot
          </NavLink>
          
        </div>
    </>
  );
};

export default GroupNavbar;
