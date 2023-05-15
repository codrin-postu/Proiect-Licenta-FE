import React from "react";
import { Link } from "react-router-dom";
import { ForceGraph2D } from "react-force-graph";

const graphData = {
  nodes: [
    { id: "Node 1", group: 1 },
    { id: "Node 2", group: 2 },
    { id: "Node 3", group: 1 },
  ],
  links: [
    { source: "Node 1", target: "Node 2" },
    { source: "Node 2", target: "Node 3" },
    { source: "Node 3", target: "Node 1" },
  ],
};

const Main: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#0A2647",
        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: "2rem" }}>
        <div style={{ marginRight: "2rem" }}>
          <img src="path_to_large_image.jpg" alt="Algorithm Graph Visualizer" />
        </div>
        <div>
          <h1 style={{ fontSize: "2rem" }}>Algorithm Graph Visualizer</h1>
          <p style={{ fontSize: "1rem" }}>
            View how search algorithms traverse the states of different problems
            such as Jealous Husbands, N-Queens, etc.
          </p>
          <Link to="/choose-problem">
            <button
              style={{
                backgroundColor: "#A77979",
                color: "#FFFFFF",
                padding: "0.5rem 1rem",
                border: "none",
              }}
            >
              Choose Problem
            </button>
          </Link>
        </div>
      </div>

      <div style={{ height: "500px" }}>
        <ForceGraph2D
          graphData={{ nodes: graphData.nodes, links: graphData.links }} // Define your graph data here
          width={800}
          height={500}
          nodeAutoColorBy="group"
          enableNodeDrag={false}
          enablePanInteraction={false}
          enableZoomInteraction={false}
        />
      </div>

      <footer
        style={{
          backgroundColor: "#553939",
          padding: "1rem",
          marginTop: "2rem",
        }}
      >
        <div>
          <a
            href="https://github.com/repository-link"
            style={{ color: "#FFFFFF", marginRight: "1rem" }}
          >
            GitHub
          </a>
          <Link to="/admin/login" style={{ color: "#FFFFFF" }}>
            Admin Login
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Main;
