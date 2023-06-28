import { refreshToken } from "../api/auth";
import {
  COLOR_STYLE,
  HEURISTIC_COLORS,
  NODE_STATUS,
  STATE_COLORS,
  STEP_TYPE,
} from "./constants";

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

const retryRefreshToken = async () => {
  try {
    const refreshTkn = localStorage.getItem("refresh_token");
    const { access, refresh } = await refreshToken(refreshTkn);
    localStorage.clear();
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  } catch (refreshError) {
    localStorage.clear();
    console.error("Failed to refresh token:", refreshError);
    window.location.href = "/";
  }
};

function updateGraphSelectedNode(graphData, node) {
  let nodes = graphData.nodes;
  let links = graphData.links;

  const nodeIndex = nodes.findIndex((n) => n.id === node.state_id);

  if (nodeIndex !== -1) {
    nodes[nodeIndex] = {
      ...nodes[nodeIndex],
      selected: true,
    };

    links.forEach((link) => {
      if (link.target.id === node.state_id) {
        link.target = nodes[nodeIndex];
      }
      if (link.source.id === node.state_id) {
        link.source = nodes[nodeIndex];
      }
    });
  }
}

function colorBasedOnChoice(node, colorStyle) {
  if (colorStyle === COLOR_STYLE.DEPTH) {
    return `rgb(0, ${Math.max(255 - node.depth * 15, 0)}, 255, ${Math.min(
      node.depth * 15
    )})`;
  } else if (colorStyle === COLOR_STYLE.HEURISTIC) {
    console.log(node.heuristic, node.heuri);
    return HEURISTIC_COLORS[node.heuristic];
  } else {
    return STATE_COLORS[NODE_STATUS[node.state_type]];
  }
}

function updateGraphData(graphData, node, stepType, colorStyle) {
  let nodes = graphData.nodes;
  let links = graphData.links;

  const nodeIndex = nodes.findIndex((n) => n.id === node.state_id);

  if (nodeIndex !== -1) {
    if (stepType === STEP_TYPE.StepForward)
      nodes[nodeIndex] = {
        ...nodes[nodeIndex],
        depth: node.depth,
        state_type: node.state_type,
        heuristic: node.heuristic,
        node_color: colorBasedOnChoice(node, colorStyle),
      };
    else if (stepType === STEP_TYPE.StepBackwards) {
      nodes[nodeIndex] = {
        ...nodes[nodeIndex],
        depth: node.prev_depth,
        state_type: node.prev_state_type,
        heuristic: node.prev_heuristic,
        node_color: colorBasedOnChoice(node, colorStyle),
      };
    }
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
      neighbours: item.neighbour_states.length,
      state_type: NODE_STATUS[item.state_type],
      boat_position: item.boat_position,
      selected: false,
      node_color:
        NODE_STATUS[item.state_type] === "START" ||
        NODE_STATUS[item.state_type] === "SOLUTION"
          ? STATE_COLORS[NODE_STATUS[item.state_type]]
          : STATE_COLORS["UNVISITED"],
    });

    // Pushing individual links into the links array
    item.neighbour_states.forEach((neighbour) => {
      if (neighbour !== -1)
        links.push({
          source: neighbour,
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
  retryRefreshToken,
  updateGraphSelectedNode,
};
