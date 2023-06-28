import React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { GridMoreVertIcon } from "@mui/x-data-grid";

const JobsDropdownMenu = ({ row, onMenuClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    handleClose();
    onMenuClick(action, row.id);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <GridMoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          disabled={!row.has_solution}
          onClick={() => handleMenuItemClick("download")}
        >
          Download Solution
        </MenuItem>
      </Menu>
    </div>
  );
};

export default JobsDropdownMenu;
