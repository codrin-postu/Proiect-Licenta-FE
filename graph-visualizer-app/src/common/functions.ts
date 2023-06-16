import { COLOR_STYLE, NODE_STATUS, STATE_COLORS } from "./constants";

const convertValuesToInt = (values) => {
  let newValues = {};
  for (let key in values) {
    newValues[key] = parseInt(values[key], 10); // parse the values to integers
  }
  return newValues;
};

function resetGraphData(graphData) {
  let nodes = graphData.nodes;
  let links = graphData.links;

  nodes.forEach((node) => {
    node.depth = 0;
    node.state_type =
      node.state_type === "START" || node.state_type === "SOLUTION"
        ? node.state_type
        : NODE_STATUS["StateStatus.Unvisited"];
    node.node_color =
      node.state_type === "START" || node.state_type === "SOLUTION"
        ? node.node_color
        : STATE_COLORS[NODE_STATUS["StateStatus.Unvisited"]];
  });

  links.forEach((link) => {
    link.target = nodes.find((node) => node.id === link.target.id);
    link.source = nodes.find((node) => node.id === link.source.id);
  });

  return { nodes, links };
}

function updateGraphData(graphData, node, colorStyle) {
  let nodes = graphData.nodes;
  let links = graphData.links;

  const nodeIndex = nodes.findIndex((n) => n.id === node.state_id);

  if (nodeIndex !== -1) {
    nodes[nodeIndex] = {
      ...nodes[nodeIndex],
      depth: node.depth,
      state_type: node.state_type,
      node_color:
        colorStyle === COLOR_STYLE.DEPTH
          ? `rgb(0, ${Math.max(255 - node.depth * 12, 0)}, ${Math.min(
              node.depth * 12,
              255
            )})`
          : STATE_COLORS[NODE_STATUS[node.state_type]],
    };
  }

  links.forEach((link) => {
    if (link.target.id === node.state_id) {
      link.target = nodes[nodeIndex];
    }
    if (link.source.id === node.state_id) {
      link.source = nodes[nodeIndex];
    }
  });

  return { nodes, links };
}

function transformToGraphData(originalData) {
  let nodes = [];
  let links = [];

  originalData.forEach((item) => {
    // Pushing individual item into the nodes array

    nodes.push({
      id: item.id,
      depth: item.depth,
      shore: item.shore,
      neighbours: item.parent_states,
      state_type: NODE_STATUS[item.state_type],
      boat_position: item.boat_position,
      node_color:
        NODE_STATUS[item.state_type] === "START" ||
        NODE_STATUS[item.state_type] === "SOLUTION"
          ? STATE_COLORS[NODE_STATUS[item.state_type]]
          : STATE_COLORS["UNVISITED"],
    });

    // Pushing individual links into the links array
    item.parent_states.forEach((parent) => {
      if (parent !== -1)
        links.push({
          source: parent,
          target: item.id,
        });
    });
  });

  return { nodes, links };
}

export {
  convertValuesToInt,
  transformToGraphData,
  updateGraphData,
  resetGraphData,
};
