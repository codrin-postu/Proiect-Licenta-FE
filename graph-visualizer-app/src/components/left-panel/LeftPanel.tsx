import React, { useEffect, useState } from "react";
import { Button, Divider, Drawer, Typography } from "@mui/material";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoCloseOutline, IoCreateOutline } from "react-icons/io5";
import "./LeftPanel.scss";

interface LeftPanelProps {
  problem: { id: string; name: string; description: string };
  algorithm: { id: string; name: string; description: string };
  states: any;
  selectedStateId: string;
  onClickNew: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  problem,
  algorithm,
  states,
  selectedStateId,
  onClickNew,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<any>();

  useEffect(() => {
    if (states && selectedStateId)
      setSelectedState(
        states.find((state: any) => state.id === selectedStateId)
      );
  }, [selectedStateId]);

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
    <div className="left-panel">
      <BsFillArrowRightCircleFill
        className="left-panel__open-btn"
        onClick={() => setIsOpen(true)}
      />

      <div className={`left-drawer ${isOpen ? "open" : ""}`}>
        <div className="left-panel__container">
          <div className="left-panel__content">
            <div className="left-panel__header">
              <Button onClick={onClickNew} startIcon={<IoCreateOutline />}>
                New
              </Button>
              <IoCloseOutline
                className="left-panel__header-btn"
                onClick={() => setIsOpen(false)}
                size={24}
              />
            </div>

            <Typography variant="h5" component="div" gutterBottom>
              {problem.name}
            </Typography>
            <Typography variant="body2" component="div" gutterBottom>
              {problem.description}
            </Typography>

            <Divider variant="middle" />

            <Typography variant="h5" component="div" gutterBottom>
              Selected State
            </Typography>
            {selectedState && (
              <Typography variant="body2" component="div" gutterBottom>
                State ID: {selectedStateId} <br />
                Depth: {selectedState?.depth} <br />
                Type: {selectedState?.state_type} <br />
                Shore: [{selectedState?.shore}] <br />
                Boat Position: {selectedState?.boat_position ? "Right" : "Left"}
                <br />
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
