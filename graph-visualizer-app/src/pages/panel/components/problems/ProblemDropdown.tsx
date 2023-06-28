import React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { GridMoreVertIcon } from "@mui/x-data-grid";

const ProblemDropdownMenu = ({ rowId, onMenuClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    handleClose();
    onMenuClick(action, rowId);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <GridMoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick("edit")}>
          Edit Details
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("algorithms")}>
          Problem Algorithms
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("fields")}>
          Problem Fields
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("delete")}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProblemDropdownMenu;
