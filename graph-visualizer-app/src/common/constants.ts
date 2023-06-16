enum COLOR_STYLE {
  STATE_TYPE = "STATE_TYPE",
  DEPTH = "DEPTH",
}

enum NODE_STATUS {
  "StateStatus.Start" = "START",
  "StateStatus.Visited" = "VISITED",
  "StateStatus.Unvisited" = "UNVISITED",
  "StateStatus.Candidate" = "CANDIDATE",
  "StateStatus.Solution" = "SOLUTION",
  "StateStatus.Path" = "PATH",
}

enum STATE_COLORS {
  UNVISITED = "#5e6572",
  VISITED = "#5db7de",
  START = "#ffd60a",
  SOLUTION = "#90A955",
  PATH = "#FFA500",
  CANDIDATE = "#03045e",
}

const DEPTH_COLOR = "#5db7de";

export { COLOR_STYLE, STATE_COLORS, DEPTH_COLOR, NODE_STATUS };
