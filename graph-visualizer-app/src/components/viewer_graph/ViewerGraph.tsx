import React, { useRef, useEffect, useState } from "react";
import { withSize, SizeMeProps } from "react-sizeme";
import { ForceGraph2D } from "react-force-graph";
import { resetGraphData, updateGraphData } from "../../common/functions";
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

const withSizeLPG = withSize({ monitorHeight: true, monitorWidth: true });

interface ViewerGraphProps extends SizeMeProps {
  graphData: { nodes: any[]; links: any[] };
  steps: any[];
  onStateSelect: (stateId: string) => void;
}

const ViewerGraph: React.FC<ViewerGraphProps> = (props) => {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [graphData, setGraphData] = useState(props.graphData);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(0.25);
  const [colorChoice, setColorChoice] = useState("STATE_TYPE");

  const graphRef = useRef<any>();

  const reset = () => {
    setCurrentStep(0);
    setPlaying(false);
    setGraphData((prevData) => resetGraphData(prevData));
  };
  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);
  const next = () =>
    currentStep < props.steps.length - 1 && setCurrentStep(currentStep + 1);
  const previous = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  useEffect(() => {
    const fg = graphRef.current;

    // I enable force simulation for 5 seconds and I disable it after
    fg.d3Force("link").strength(0.07);
    fg.d3Force("charge").strength(-50);
    setTimeout(() => {
      fg.d3Force("link").strength(0);
      fg.d3Force("charge").strength(0);
    }, 3000);
  }, []);

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        currentStep < props.steps.length - 1
          ? setCurrentStep(currentStep + 1)
          : setPlaying(false);
      }, playSpeed * 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [playing, currentStep, props.steps.length, playSpeed]);

  useEffect(() => {
    if (currentStep) {
      const result = updateGraphData(
        graphData,
        props.steps[currentStep],
        colorChoice
      );
      setGraphData(() => result);
      props.onStateSelect(props.steps[currentStep].state_id);
    }
  }, [currentStep]);

  const handleOpen = () => setOpenSettingsModal(true);
  const handleClose = () => setOpenSettingsModal(false);
  const handlePlaySpeedChange = (event) => setPlaySpeed(event.target.value);
  const handleColorChoiceChange = (event) => setColorChoice(event.target.value);

  return (
    <>
      <ForceGraph2D
        ref={graphRef}
        backgroundColor="#eef1ef"
        graphData={{
          nodes: graphData.nodes,
          links: graphData.links,
        }}
        nodeColor={(node) => {
          return node.node_color || "#000000";
        }}
        onNodeClick={(node) => {
          graphRef.current.d3Force("link").strength(0);
          graphRef.current.d3Force("charge").strength(0);
          props.onStateSelect(node.id);
        }}
        width={props.size.width || undefined}
        height={props.size.height || undefined}
        enableNodeDrag={false}
        linkWidth={1}
        nodeRelSize={5}
        linkColor={() => "#dddddd"}
      />
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
          <Button onClick={reset}>
            <FaRedo />
          </Button>
          <Button onClick={play}>
            <FaPlay />
          </Button>
          <Button onClick={pause}>
            <FaPause />
          </Button>
          <Button onClick={next}>
            <FaStepForward />
          </Button>
          <Button onClick={previous}>
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
                value={playSpeed}
                label="Play Speed"
                onChange={handlePlaySpeedChange}
              >
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
                value={colorChoice}
                label="Color Choice"
                onChange={handleColorChoiceChange}
              >
                <MenuItem value="STATE_TYPE">State Type</MenuItem>
                <MenuItem value="DEPTH">Depth</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default withSizeLPG(ViewerGraph);
