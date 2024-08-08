import React from 'react';
import { Search, Settings, ExitToApp, ExpandMore, ExpandLess } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="relative w-1/3">
        <Search className="absolute top-2 left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search anything"
          className="w-full pl-10 pr-4 py-2 border-0 outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAACUCAMAAADMOLmaAAAAPFBMVEX///+ZmZmWlpbGxsaTk5OQkJCcnJz4+Pjk5OSlpaX09PTe3t69vb3p6emfn5/Dw8Ourq7W1tbNzc21tbUF10UkAAAFOElEQVR4nO1c65KrIAyuAfEu1L7/u55a261VMSFB25nD92dnd2bxI0DucLkkJCQkJCQkJCQk/Ico6vI6tK6a4Fp1Levi26ReKLrGOqPzXANANuL+8/5rbpxquu/TLK3rQU/Mlrj/vXe2/CK7omxhlNwmvT+WedaW35FkPTjQe+T+oMEN53Osbb8vvE9JZr2tT+XXKaL45oK03XkEhz6U3yhH6IeT+DWGwW+So2lO4Fe3Ht1CkmPeHr4dG8Pn9+CYHSvGwgoE+IS2B2qe2nF34AdFd9hKS1f4BTjqwDQBKhqhCIdQvEaiN3G8xic45DEZZnl07X2NcUbm0JGlOMTagkdRLGNLMBuPS0TftjPUr46RAPXIQx/N2akr0jc1VLfWKtveKppvBlUs1X3TBBnmmXqFd/fATxnK0de3OAQpegaqpfa4UgQfR+eUGfop0Gq9XoXKCRxjnBZcFj47S7DjUMkJKnSNwfjOZIdTzJWUYId94k7Qv1IlfsS80yOiuOELtbeVSnyCwvPcoIpN290BLD6AzBOrUBn0+z590WOLIDssuEeDOnpXdJtIXIgCjUtww4WbTHD80KrBjwmuLBQuRP5OdLg6w3VFhytUxyVY4wYZCMPgto8wz220uA9FOYf4SuiWR7DocRFShsYnChXvrOB6AlPXE3ClnWU8hWMJDCl2X+EMgTLTFWrcnkSTIS8eKCmuNWkfUpxtzmkmLA7NplLCAc0JB0gBXhx9OEamDIakgJJiU0gD6XCCpIEN4agQVAJtqksMkYJyajogfCPSph7DP5zGCdeIeIAyjWwQH5uYWQ4PVwrc3k9AwklLTIyGm+aOYFGeY+/5nyU17xhuVTrcsXlhP16mJvaCU3V4oPuevnfwGg30ZgjN4OAhyoyiL2+D56Rmg4QGK3goPx99qxJWq6AKW3A4FcRw3OhLvUjKH84ZhjqxgQzHHKz9a7Gh5mDPZXj/Rla5Zx47C//v4CpVQ8ldrz8TUApY4AwZyhB+UqiSMFMX1RaCxBmsbaga24A2VTuUK5s19qrZytA1TqjGJuR3HzPP+2Gn+6zohp5SEcgY2WJKLHo3GQ6feedIpqUKZUjxvnJH2zuNI6SowpOIqAcLoKiDFgo/M+EJdywKgKBl6TAbyIgCkEgqtCWlRnYNhEdS+9EoI+O3n6TjpEX2BmSVaW57IzIi+r2sCC97v6ceWEUV70Y0gFR5vBT9kSkrs+TP4bM7jvzuCCs7501n8BKmD/hUGLPjwTdcz++f8AV/zEl7Gr1ySSePr1DIG7PYdB5Yucg3toXIrFZsJ6BZp+6NTQ3BrfhsV82EjUab2RZ21Wyr3iUt+m/5TPzK41awIm5t3Dgrgurthp0CaSNwsWIoqYBvTNgICV4u610oWpblvhZvw/VGFLYtLS2pUNeMWOobYTfLcsayFXng+qnDxKuy6KrK5b1ui4qmtKtq2ZmmYzOUd6YtfO0oDGfpjBjdfZ/rHGWV5wmXKM2680JzZIakLgQCZkGals+5ezOMoF0nzOIBaJUUb58uXrfzvFsU5IioaN44out+v/kzGLR6eBBiX66If/sj+jWfgZjtJSL+DZoxOI1HEZjhJ4Kfv8kluTC6IHjc9dGfv1H4uJUpJ3jkrcxLhJutx18Qlt0O1sffDr78/g3rEaxb6pk+7Zb6hXnTX5140/8S/FoCnP1awohicPqXX5x4cCzbLEckCfC9VzsmjC+faO/LJ9p89+WTCY/XY/p89XqMNjf7C6/HPLF4gedmf+kFnoSEhISEhISEhIQz8Q9NjTugcGsNcwAAAABJRU5ErkJggg=="
          alt="User"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex items-center">
          <div onClick={handleClick} className="cursor-pointer flex items-center space-x-2">
            <div className="flex flex-col items-start">
              <span className="font-medium">Mr Luis</span>
              <span className="text-sm text-gray-500">Patient</span>
            </div>
            {anchorEl ? <ExpandLess /> : <ExpandMore />}
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted
          >
            <MenuItem onClick={handleClose} className="flex items-center space-x-2">
              <Settings />
              <span>Settings</span>
            </MenuItem>
            <MenuItem onClick={handleClose} className="flex items-center space-x-2">
              <ExitToApp />
              <span>Exit</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
