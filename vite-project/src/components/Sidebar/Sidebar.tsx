import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItemText, Collapse, ListItemButton, ListItemIcon } from '@mui/material';
import { Home, Group, Science, CreditCard, ExpandLess, ExpandMore, ImportExport, Support, ExitToApp } from '@mui/icons-material';

const Sidebar: React.FC = () => {
  const [openOrganizations, setOpenOrganizations] = React.useState(false);
  const [openLabs, setOpenLabs] = React.useState(false);
  const [openCards, setOpenCards] = React.useState(false);

  const handleOrganizationsClick = () => {
    setOpenOrganizations(!openOrganizations);
  };

  const handleLabsClick = () => {
    setOpenLabs(!openLabs);
  };

  const handleCardsClick = () => {
    setOpenCards(!openCards);
  };

  return (
    <div className="flex flex-col h-screen p-3 bg-white text-cyan-500 w-64">
      <div className="flex items-center shadow-md">
        <img style={{width: "7rem",height:"3rem", margin:"7px"}} className="h-8"
         src="data:image/jpeg;base64,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" alt="Logo" /> {/* Replace with your logo path */}
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="mt-2">
            <NavLink to="/" className="p-2 rounded hover:bg-cyan-100 flex items-center">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Overview" />
            </NavLink>
          </div>

          <div className="mt-2">
            <ListItemButton onClick={handleOrganizationsClick} className="p-2 rounded hover:bg-cyan-100">
              <ListItemIcon><Group /></ListItemIcon>
              <ListItemText primary="Organizations" />
              {openOrganizations ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openOrganizations} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="/groups" className="block p-2 rounded pl-8 hover:bg-cyan-100 items-center">
                  <ListItemIcon><Group /></ListItemIcon>
                  <ListItemText primary="Groups" />
                </NavLink>
              </List>
            </Collapse>
          </div>

          <div className="mt-2">
            <ListItemButton onClick={handleLabsClick} className="p-2 rounded hover:bg-cyan-100">
              <ListItemIcon><Science /></ListItemIcon>
              <ListItemText primary="Labs" />
              {openLabs ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openLabs} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="/tests" className="block p-2 rounded pl-8 hover:bg-cyan-100 items-center">
                  <ListItemIcon><Science /></ListItemIcon>
                  <ListItemText primary="Tests" />
                </NavLink>
              </List>
            </Collapse>
          </div>

          <div className="mt-2">
            <ListItemButton onClick={handleCardsClick} className="p-2 rounded hover:bg-cyan-100">
              <ListItemIcon><CreditCard /></ListItemIcon>
              <ListItemText primary="Cards" />
              {openCards ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCards} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink to="/abbott" className="block p-2 rounded pl-8 hover:bg-cyan-100">Abbott</NavLink>
                <NavLink to="/accula" className="block p-2 rounded pl-8 hover:bg-cyan-100">Accula</NavLink>
                <NavLink to="/carestart" className="block p-2 rounded pl-8 hover:bg-cyan-100">CareStart</NavLink>
                <NavLink to="/cepheid" className="block p-2 rounded pl-8 hover:bg-cyan-100">Cepheid</NavLink>
                <NavLink to="/cue" className="block p-2 rounded pl-8 hover:bg-cyan-100">Cue</NavLink>
                <NavLink to="/quidel" className="block p-2 rounded pl-8 hover:bg-cyan-100">Quidel</NavLink>
                <NavLink to="/visby" className="block p-2 rounded pl-8 hover:bg-cyan-100">Visby</NavLink>
              </List>
            </Collapse>
          </div>
        <div className="mt-2">
          <NavLink to="/exports" className="block p-2 rounded hover:bg-cyan-100 flex items-center">
          <ListItemIcon><ImportExport /></ListItemIcon>
          <ListItemText primary="Exports" />
        </NavLink>
        </div>
        </div>
      </div>
      
      <div className="mt-auto space-y-1">
        
        <NavLink to="/support" className="block p-2 rounded hover:bg-cyan-100 flex items-center">
          <ListItemIcon><Support /></ListItemIcon>
          <ListItemText primary="Support" />
        </NavLink>
        <NavLink to="/logout" className="block p-2 rounded hover:bg-cyan-100 flex items-center">
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Log Out" />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
