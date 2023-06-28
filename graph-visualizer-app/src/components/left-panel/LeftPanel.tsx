import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Divider, Typography } from "@mui/material";
import { BsCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoCloseOutline, IoCreateOutline } from "react-icons/io5";
import "./LeftPanel.scss";
import DEFAULT_STRINGS from "../../common/default_strings";
import { STATE_COLORS } from "../../common/constants";
import ReactQuill from "react-quill";

interface LeftPanelProps {
  isInitialOpen: boolean;
  problem: { id: string; name: string; description: string; values: object };
  algorithm: { id: string; name: string; description: string };
  states: any;
  selectedStateId: string;
  onClickNew: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  isInitialOpen,
  problem,
  algorithm,
  states,
  selectedStateId,
  onClickNew,
}) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen);
  const [selectedState, setSelectedState] = useState<any>();
  const [selectedPage, setSelectedPage] = useState("problem");

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

      <div className={`left-panel__drawer ${isOpen ? "open" : ""}`}>
        <div className="left-panel__container">
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
          <Divider variant="fullWidth" />

          <ButtonGroup variant="text" className="left-panel__navigation">
            <Button
              id="problem"
              onClick={() => setSelectedPage("problem")}
              className="left-panel__navigation-btn"
              variant={selectedPage === "problem" ? "contained" : "text"}
              color="primary"
            >
              Problem
            </Button>
            <Button
              id="algorithm"
              onClick={() => setSelectedPage("algorithm")}
              className="left-panel__navigation-btn"
              variant={selectedPage === "algorithm" ? "contained" : "text"}
              color="primary"
            >
              Algorithm
            </Button>
            <Button
              id="states"
              onClick={() => setSelectedPage("states")}
              className="left-panel__navigation-btn"
              variant={selectedPage === "states" ? "contained" : "text"}
              color="primary"
            >
              States
            </Button>
          </ButtonGroup>
          <Divider variant="fullWidth" />

          {selectedPage === "problem" && (
            <>
              <div className="left-panel__problem">
                <Typography
                  className="left-panel__subtitle"
                  variant="h6"
                  component="div"
                  gutterBottom
                >
                  {problem.name || DEFAULT_STRINGS.problemSubtitle}
                </Typography>
                <Divider variant="fullWidth" />

                <div className="left-panel__problem-description">
                  {problem.description ? (
                    <ReactQuill
                      className="left-panel__problem-description__quill"
                      value={problem.description}
                      placeholder="description"
                      readOnly={true}
                      modules={{
                        toolbar: false,
                      }}
                      formats={[
                        "code-block",
                        "bold",
                        "italic",
                        "underline",
                        "color",
                        "strike",
                        "size",
                        "underline",
                        "list",
                        "indent",
                        "link",
                        "header",
                      ]}
                    />
                  ) : (
                    DEFAULT_STRINGS.problemDescription
                  )}
                </div>
              </div>

              <Divider variant="fullWidth" />

              <div className="left-panel__selected-data">
                <Typography
                  className="left-panel__subtitle"
                  variant="h6"
                  component="div"
                  gutterBottom
                >
                  Selected Data
                </Typography>
                <Divider variant="fullWidth" />
                <Typography
                  className="left-panel__selected-data-description"
                  variant="body2"
                  component="div"
                  gutterBottom
                >
                  {problem.values
                    ? Object.entries(problem.values).map(([key, value]) => (
                        <div>
                          <span>{key}:</span> {value}
                        </div>
                      ))
                    : DEFAULT_STRINGS.selectedDataDescription}
                </Typography>
              </div>
            </>
          )}

          {selectedPage === "algorithm" && (
            <>
              <div className="left-panel__algorithm">
                <Typography
                  className="left-panel__subtitle"
                  variant="h6"
                  component="div"
                  gutterBottom
                >
                  {algorithm.name || "Algorithm"}
                </Typography>
                <Divider variant="fullWidth" />

                <div className="left-panel__algorithm-description">
                  {algorithm.description ? (
                    <ReactQuill
                      className="left-panel__algorithm-description__quill"
                      value={algorithm.description}
                      placeholder="description"
                      readOnly={true}
                      modules={{
                        toolbar: false,
                      }}
                      formats={[
                        "code-block",
                        "bold",
                        "italic",
                        "underline",
                        "color",
                        "strike",
                        "size",
                        "underline",
                        "list",
                        "indent",
                        "link",
                        "header",
                      ]}
                    />
                  ) : (
                    "No description"
                  )}
                </div>
              </div>
              <Divider variant="fullWidth" />
            </>
          )}

          {selectedPage === "states" && (
            <>
              <div className="left-panel__states-info">
                <Typography
                  className="left-panel__subtitle"
                  variant="h6"
                  component="div"
                  gutterBottom
                >
                  {DEFAULT_STRINGS.statesInfoSubtitle}
                </Typography>
                <Divider variant="fullWidth" />

                <div className="left-panel__states-info-description">
                  {DEFAULT_STRINGS.statesInfoDescription} <br />
                  Color codes: <br />
                  <span className="left-panel__color-code">
                    <BsCircleFill
                      color={STATE_COLORS.START}
                      className="left-panel__color-code-icon"
                    />
                    Start State
                  </span>
                  <span className="left-panel__color-code">
                    <BsCircleFill
                      color={STATE_COLORS.UNVISITED}
                      className="left-panel__color-code-icon"
                    />
                    Unvisited State
                  </span>
                  <span className="left-panel__color-code">
                    <BsCircleFill
                      color={STATE_COLORS.VISITED}
                      className="left-panel__color-code-icon"
                    />
                    Visited State
                  </span>
                  <span className="left-panel__color-code">
                    <BsCircleFill
                      color={STATE_COLORS.CANDIDATE}
                      className="left-panel__color-code-icon"
                    />
                    Candidate State
                  </span>
                  <span className="left-panel__color-code">
                    <BsCircleFill
                      color={STATE_COLORS.PATH}
                      className="left-panel__color-code-icon"
                    />
                    Path State
                  </span>
                  <span className="left-panel__color-code">
                    <BsCircleFill
                      color={STATE_COLORS.SOLUTION}
                      className="left-panel__color-code-icon"
                    />
                    Solution State
                  </span>
                </div>
              </div>

              <Divider variant="fullWidth" />

              <div className="left-panel__selected-data">
                <Typography
                  className="left-panel__subtitle"
                  variant="h6"
                  component="div"
                  gutterBottom
                >
                  Selected State
                </Typography>
                <Divider variant="fullWidth" />
                {selectedState && (
                  <Typography
                    className="left-panel__selected-data-description"
                    variant="body2"
                    component="div"
                    gutterBottom
                  >
                    {Object.entries(selectedState || {}).map((value) => (
                      <div>
                        <span>{value[0]}:</span>
                        {Array.isArray(value[1])
                          ? value[1].join(", ")
                          : value[1]}
                      </div>
                    ))}
                  </Typography>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
