import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRedo,
  FaCog,
} from "react-icons/fa";

interface TopControlProps {
  playSpeed: number;
  colorChoice: string;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onPlaySpeedChange: (playSpeed: number) => void;
  onColorChoiceChange: (colorChoice: string) => void;
}

const TopControl: React.FC<TopControlProps> = (props) => {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const handleOpen = () => setOpenSettingsModal(true);
  const handleClose = () => setOpenSettingsModal(false);
  const handlePlaySpeedChange = (event) =>
    props.onPlaySpeedChange(event.target.value);
  const handleColorChoiceChange = (event) =>
    props.onColorChoiceChange(event.target.value);

  return (
    <Box
      sx={{
        zIndex: 1,
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translate(-50%, -2px)",
      }}
    >
      <ButtonGroup variant="contained">
        <Button onClick={props.onReset}>
          <FaRedo />
        </Button>
        <Button onClick={props.onPlay}>
          <FaPlay />
        </Button>
        <Button onClick={props.onPause}>
          <FaPause />
        </Button>
        <Button onClick={props.onNextStep}>
          <FaStepForward />
        </Button>
        <Button onClick={props.onPreviousStep}>
          <FaStepBackward />
        </Button>
        <Button onClick={handleOpen}>
          <FaCog />
        </Button>
      </ButtonGroup>

      <Dialog open={openSettingsModal} onClose={handleClose}>
        <DialogTitle>Graph Settings</DialogTitle>
        <DialogContent sx={{ width: "350px" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="play-speed-label">Play Speed</InputLabel>
            <Select
              labelId="play-speed-label"
              id="play-speed"
              value={props.playSpeed}
              label="Play Speed"
              onChange={handlePlaySpeedChange}
            >
              <MenuItem value={0.01}>0.01</MenuItem>
              <MenuItem value={0.05}>0.05</MenuItem>
              <MenuItem value={0.1}>0.1</MenuItem>
              <MenuItem value={0.25}>0.25</MenuItem>
              <MenuItem value={0.5}>0.5</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="color-choice-label">Color Choice</InputLabel>
            <Select
              labelId="color-choice-label"
              id="color-choice"
              value={props.colorChoice}
              label="Color Choice"
              onChange={handleColorChoiceChange}
            >
              <MenuItem value="STATE_TYPE">State Type</MenuItem>
              <MenuItem value="DEPTH">Depth</MenuItem>
              <MenuItem value="HEURISTIC">Heuristic</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TopControl;
