import React, { useRef, useEffect } from "react";
import { withSize, SizeMeProps } from "react-sizeme";
import { ForceGraph3D } from "react-force-graph";

const graphData = {
  nodes: [
    { id: "1", group: 1 },
    { id: "2", group: 2 },
    { id: "3", group: 1 },
    { id: "4", group: 2 },
    { id: "5", group: 1 },
    { id: "6", group: 2 },
    { id: "7", group: 1 },
  ],
  links: [
    { source: "1", target: "2" },
    { source: "2", target: "3" },
    { source: "3", target: "1" },
    { source: "4", target: "5" },
    { source: "5", target: "6" },
    { source: "6", target: "4" },
    { source: "7", target: "1" },
    { source: "7", target: "2" },
    { source: "7", target: "3" },
    { source: "7", target: "4" },
    { source: "7", target: "5" },
    { source: "1", target: "4" },
  ],
};

const withSizeLPG = withSize({ monitorHeight: true, monitorWidth: true });

interface LandpageGraphProps extends SizeMeProps {}

const LandpageGraph: React.FC<LandpageGraphProps> = (props) => {
  const graphRef = useRef<any>();
  const rotationSpeed = 0.005;
  const distance = 300; //camera distance from center
  let cameraAngle = 0;

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      if (graphRef.current) {
        cameraAngle += rotationSpeed; // Increment the angle
        const cameraPosition = {
          x: distance * Math.sin(cameraAngle),
          y: 0,
          z: distance * Math.cos(cameraAngle),
        };

        graphRef.current.cameraPosition(
          cameraPosition, // new position
          { x: 0, y: 0, z: 0 }, // center of the scene
          20 // duration of the transition in ms
        );
      }
    }, 50);

    return () => {
      clearInterval(rotationInterval);
    };
  }, []);
  return (
    <ForceGraph3D
      ref={graphRef}
      backgroundColor="#eef1ef"
      graphData={{ nodes: graphData.nodes, links: graphData.links }}
      nodeAutoColorBy="group"
      width={props.size.width || undefined}
      height={props.size.height || undefined}
      enableNodeDrag={false}
      enablePointerInteraction={false}
      enableNavigationControls={false}
      showNavInfo={false}
      linkOpacity={1}
      nodeOpacity={1}
      linkWidth={2}
    />
  );
};

export default withSizeLPG(LandpageGraph);
