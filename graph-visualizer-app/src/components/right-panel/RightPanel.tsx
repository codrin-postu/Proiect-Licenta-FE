import React, { useState } from "react";
import { Divider, Drawer, Typography } from "@mui/material";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import "./RightPanel.scss";

interface RightPanelProps {
  selectedStateId: string;
  states: any;
  steps: any;
}

const RightPanel: React.FC<RightPanelProps> = ({ selectedStateId, states }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <div className="right-panel">
      <BsFillArrowLeftCircleFill
        className="right-panel__open-btn"
        onClick={() => setIsOpen(true)}
      />

      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="right-panel__container">
          <div className="right-panel__content">
            <div className="right-panel__header">
              <IoCloseOutline
                className="right-panel__header-btn"
                onClick={() => setIsOpen(false)}
                size={24}
              />
            </div>

            <Typography variant="h4" component="div" gutterBottom>
              Selected State
            </Typography>
            <Typography variant="body2" component="div" gutterBottom>
              <Divider variant="middle" />
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
