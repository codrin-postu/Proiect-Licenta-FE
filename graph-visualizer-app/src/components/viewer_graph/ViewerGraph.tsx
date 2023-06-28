import React, { useRef, useEffect, useState } from "react";
import { withSize, SizeMeProps } from "react-sizeme";
import { ForceGraph2D } from "react-force-graph";
import { resetGraphData, updateGraphData } from "../../common/functions";

import TopControl from "../top_controls/TopControl";
import { STEP_TYPE } from "../../common/constants";

// create an enum with three values: StepForward, StepBackwards and Pause

const withSizeLPG = withSize({ monitorHeight: true, monitorWidth: true });

interface ViewerGraphProps extends SizeMeProps {
  graphData: { nodes: any[]; links: any[] };
  steps: any[];
  selectedStateId: string;
  onStateSelect: (stateId: string) => void;
}

const ViewerGraph: React.FC<ViewerGraphProps> = (props) => {
  const [graphData, setGraphData] = useState(props.graphData);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepType, setStepType] = useState<STEP_TYPE>(STEP_TYPE.Pause);
  const [playing, setPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(0.25);
  const [colorChoice, setColorChoice] = useState("STATE_TYPE");

  console.log(graphData);
  const graphRef = useRef<any>();

  const reset = () => {
    setCurrentStep(0);
    setPlaying(false);
    setGraphData((prevData) => resetGraphData(prevData));
  };
  const play = () => {
    setPlaying(true);
    setStepType(STEP_TYPE.StepForward);
  };
  const pause = () => {
    setPlaying(false);
    setStepType(STEP_TYPE.Pause);
  };
  const next = () => {
    currentStep < props.steps.length - 1 && setCurrentStep(currentStep + 1);
    setStepType(STEP_TYPE.StepForward);
  };
  const previous = () => {
    currentStep > 0 && setCurrentStep(currentStep - 1);
    setStepType(STEP_TYPE.StepBackwards);
  };

  useEffect(() => {
    const fg = graphRef.current;

    // I enable force simulation for 3 seconds and I disable it after
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
    const result = updateGraphData(
      graphData,
      props.steps[
        stepType === STEP_TYPE.StepForward ? currentStep : currentStep + 1
      ],
      stepType,
      colorChoice
    );
    setGraphData(() => result);
    props.onStateSelect(
      props.steps[
        stepType === STEP_TYPE.StepForward ? currentStep : currentStep + 1
      ].state_id
    );
  }, [currentStep]);

  return (
    <>
      <ForceGraph2D
        ref={graphRef}
        backgroundColor="#eef1ef"
        graphData={{
          nodes: graphData.nodes,
          links: graphData.links,
        }}
        linkCanvasObject={(link, ctx) => {
          const isPath =
            (link.source.state_type === "StateStatus.Path" ||
              link.source.state_type === "START" ||
              link.source.state_type === "StateStatus.Solution") &&
            (link.target.state_type === "StateStatus.Path" ||
              link.target.state_type === "StateStatus.Solution" ||
              link.target.state_type === "START");
          const isClicked =
            link.source.id === props.selectedStateId ||
            link.target.id === props.selectedStateId;
          const linkThickness = isClicked ? 2 : 1; // Adjust the link thickness as desired

          // Render the link
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.strokeStyle = "#dddddd";
          ctx.strokeStyle = isPath ? "#ff0000" : ctx.strokeStyle;
          ctx.strokeStyle = isClicked ? "#f030d2" : ctx.strokeStyle;
          ctx.lineWidth = linkThickness;
          ctx.stroke();
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const isClicked = node.id === props.selectedStateId; // Assuming you have a "clickedNodeId" state variable

          let nodeShape = "circle";

          switch (node.state_type) {
            case "START":
              nodeShape = "square";
              break;
            case "SOLUTION":
              nodeShape = "square";
              break;
            default:
              nodeShape = "circle";
              break;
          }

          const nodeSize = 12;
          const nodeRadius = nodeSize / 2;

          // Render the node
          ctx.fillStyle = node.node_color || "#000000";
          if (isClicked) {
            ctx.fillStyle = "#ff0000";
          }
          ctx.beginPath();
          if (nodeShape === "square") {
            ctx.rect(
              node.x - nodeRadius,
              node.y - nodeRadius,
              nodeSize,
              nodeSize
            );
          } else {
            ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
          }
          ctx.fill();
          ctx.closePath();
        }}
        nodeLabel={(node) => {
          return node.id || "Empty";
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
        // linkWidth={2}
        nodeRelSize={7}
        linkColor={(link) => {
          return link.link_color || "#dddddd";
        }}
      />
      <TopControl
        onReset={reset}
        onPlay={play}
        onPause={pause}
        onNextStep={next}
        onPreviousStep={previous}
        onColorChoiceChange={setColorChoice}
        onPlaySpeedChange={setPlaySpeed}
        playSpeed={playSpeed}
        colorChoice={colorChoice}
      />
    </>
  );
};

export default withSizeLPG(ViewerGraph);
