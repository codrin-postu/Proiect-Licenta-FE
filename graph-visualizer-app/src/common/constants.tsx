const BASE_URL = "http://localhost:8000/api";

enum COLOR_STYLE {
  STATE_TYPE = "STATE_TYPE",
  DEPTH = "DEPTH",
  HEURISTIC = "HEURISTIC",
}

enum NODE_STATUS {
  "StateStatus.Start" = "START",
  "StateStatus.Visited" = "VISITED",
  "StateStatus.Unvisited" = "UNVISITED",
  "StateStatus.Candidate" = "CANDIDATE",
  "StateStatus.Solution" = "SOLUTION",
  "StateStatus.Path" = "PATH",
}

enum STEP_TYPE {
  StepForward,
  StepBackwards,
  Pause,
}

enum STATE_COLORS {
  UNVISITED = "#5e6572",
  VISITED = "#5db7de",
  START = "#ffd60a",
  SOLUTION = "#a5c94f",
  PATH = "#ab7a20",
  CANDIDATE = "#03045e",
}

const DEPTH_COLOR = "#5db7de";

// Admin panel constants
const PROBLEM_COLUMNS = [
  { field: "id", headerName: "ID", minWidth: 120, flex: 1, width: 120 },
  { field: "name", headerName: "Name", minWidth: 150, flex: 1, width: 150 },
  {
    field: "description",
    headerName: "Description",
    minWidth: 250,
    flex: 3,
  },
  {
    field: "is_active",
    headerName: "Active",
    flex: 0,
    minWidth: 120,
    width: 120,
  },
];

const PROBLEM_FIELDS_COLUMNS = [
  { field: "id", headerName: "ID", minWidth: 80, flex: 1 },
  { field: "name", headerName: "Name", minWidth: 120, flex: 1 },
  {
    field: "description",
    headerName: "Description",
    minWidth: 120,
    flex: 3,
  },
  {
    field: "max_value",
    headerName: "Max Value",
    flex: 1,
    minWidth: 120,
  },
];

const HEURISTIC_COLORS = {
  1: "#00FF00", // Green
  2: "#FFFF00", // Yellow
  3: "#0000FF", // Blue
  4: "#FF0000", // Red
  5: "#FFA500", // Orange
  6: "#800080", // Purple
  7: "#00FFFF", // Cyan
  8: "#FF00FF", // Magenta
  9: "#00FF00", // Lime
  10: "#FFC0CB", // Pink
  11: "#008080", // Teal
  12: "#800000", // Maroon
  13: "#000080", // Navy
  14: "#808000", // Olive
  15: "#00FFFF", // Aqua
  16: "#C0C0C0", // Silver
  17: "#808080", // Gray
  18: "#FF00FF", // Fuchsia
  19: "#32CD32", // Lime Green
  20: "#FF7F50", // Coral
  21: "#4B0082", // Indigo
  22: "#FFD700", // Gold
  23: "#DA70D6", // Orchid
  24: "#87CEEB", // Sky Blue
  25: "#FA8072", // Salmon
};

const PROBLEM_ALGORITHMS_COLUMNS = [
  {
    field: "name",
    headerName: "Algorithm Name",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "is_active",
    headerName: "Active",
    flex: 1,
    minWidth: 120,
    width: 120,
  },
];

const ALGORITHM_COLUMNS = [
  { field: "id", headerName: "ID", minWidth: 120, flex: 1, width: 120 },
  { field: "name", headerName: "Name", minWidth: 150, flex: 1, width: 150 },
  {
    field: "description",
    headerName: "Description",
    minWidth: 250,
    flex: 3,
  },
];

const JOB_COLUMNS = [
  { field: "id", headerName: "ID", minWidth: 100, flex: 0.5 },
  { field: "status", headerName: "Status", minWidth: 150, flex: 1 },
  {
    field: "time_requested",
    headerName: "Time Requested",
    minWidth: 150,
    flex: 1,
    renderCell: (params: any) => {
      const date = new Date(params.row.time_requested);
      return <>{date.toLocaleString()}</>;
    },
  },
  {
    field: "algorithm",
    headerName: "Algorithm ID",
    minWidth: 150,
  },
  {
    field: "problem",
    headerName: "Problem ID",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "values",
    headerName: "Values",
    minWidth: 150,
    flex: 1,
    renderCell: (params: any) => {
      const values = params.row.values;
      return <>{JSON.stringify(values)}</>;
    },
  },
  {
    field: "has_solution",
    headerName: "Has Solution",
    minWidth: 150,
    flex: 1,
  },
];

export {
  BASE_URL,
  COLOR_STYLE,
  STATE_COLORS,
  DEPTH_COLOR,
  NODE_STATUS,
  STEP_TYPE,
  PROBLEM_COLUMNS,
  ALGORITHM_COLUMNS,
  PROBLEM_FIELDS_COLUMNS,
  PROBLEM_ALGORITHMS_COLUMNS,
  JOB_COLUMNS,
  HEURISTIC_COLORS,
};
