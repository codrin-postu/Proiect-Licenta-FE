import React from "react";
import { Button, Divider, Typography } from "@mui/material";
import "./AdminLeftPanel.scss";
import { logout } from "../../api/auth";

const adminMenu = [
  {
    id: "problems",
    name: "Problems Data",
  },
  {
    id: "algorithms",
    name: "Algorithms Data",
  },
  {
    id: "jobs",
    name: "Requested Jobs",
  },
];

interface AdminLeftPanelProps {
  onMenuClick: (id: string) => void;
  selectedPage: string;
}

const AdminLeftPanel: React.FC<AdminLeftPanelProps> = ({
  onMenuClick,
  selectedPage,
}) => {
  const generateMenu = () => {
    return adminMenu.map((item) => (
      <Button
        id={item.id}
        key={item.id}
        onClick={() => onMenuClick(item.id)}
        className="menu-panel__navigation-btn"
        variant={selectedPage === item.id ? "contained" : "text"}
        color="primary"
      >
        {item.name}
      </Button>
    ));
  };

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="menu-panel">
      <div className={`menu-panel__drawer open`}>
        <div className="menu-panel__container">
          <Divider variant="fullWidth" />

          <div className="menu-panel__navigation">
            <Typography variant="h6" className="menu-panel__navigation-title">
              Admin Menu
            </Typography>
            {generateMenu()}
          </div>
        </div>
        <div className="menu-panel__footer">
          <Button
            id={"logout"}
            onClick={handleLogout}
            className="menu-panel__navigation-btn"
            variant="text"
            color="primary"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftPanel;
