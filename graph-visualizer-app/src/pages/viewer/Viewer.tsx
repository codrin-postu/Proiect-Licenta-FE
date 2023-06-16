import React, { useState, useEffect } from "react";
import LeftPanel from "../../components/left-panel/LeftPanel";
import Wizard from "../../components/wizard/Wizard";
import { getJobSolution, getJobStatus, postJobRequest } from "../../api/graph";
import ViewerGraph from "../../components/viewer_graph/ViewerGraph";
import { transformToGraphData } from "../../common/functions";
import "./Viewer.scss";

interface ViewerProps {}

const Viewer: React.FC<ViewerProps> = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(true);
  const [jobData, setJobData] = useState<any>({});
  const [jobStatus, setJobStatus] = useState("PENDING");
  const [jobSolution, setJobSolution] = useState<any>({});
  const [selectedProblem, setSelectedProblem] = useState<any>({});
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<any>({});
  const [selectedStateId, setSelectedStateId] = useState<string>("");

  useEffect(() => {
    let intervalId;
    if (jobData.id) {
      console.log(jobData);
      intervalId = setInterval(async () => {
        const statusResponse = await getJobStatus(jobData.id);
        setJobStatus(statusResponse.status); // assuming the response has a 'status' property
        if (
          statusResponse.status !== "PENDING" &&
          statusResponse.status !== "RUNNING"
        ) {
          clearInterval(intervalId);
        }
      }, 2000); // 2 seconds
    }

    // clean up on component unmount or if jobData.id changes
    return () => clearInterval(intervalId);
  }, [jobData]);

  useEffect(() => {
    if (jobStatus === "COMPLETE") {
      const fetchSolution = async () => {
        const solution = await getJobSolution(jobData.id);
        setJobSolution(solution);
      };
      fetchSolution();
    }
  }, [jobStatus, jobData.id]);

  const handleProblemDataSelect = async (
    problemId: string,
    problemName: string,
    problemDescription: string,
    algorithmId: string,
    algorithmName: string,
    algorithmDescription: string,
    values: object
  ) => {
    try {
      setIsWizardOpen(false);
      const response = await postJobRequest(problemId, algorithmId, values);
      setJobData(response);
      setSelectedProblem({
        id: problemId,
        name: problemName,
        description: problemDescription,
      });
      setSelectedAlgorithm({
        id: algorithmId,
        name: algorithmName,
        description: algorithmDescription,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickedNew = () => {
    setIsWizardOpen(true);
  };

  const handleStateSelect = (stateId: string) => {
    setSelectedStateId(stateId);
  };

  return (
    <div className="viewer-container">
      <LeftPanel
        onClickNew={handleClickedNew}
        problem={selectedProblem}
        algorithm={selectedAlgorithm}
        states={jobSolution.states}
        selectedStateId={selectedStateId}
      />
      <Wizard
        isOpen={isWizardOpen}
        onProblemDataSelect={handleProblemDataSelect}
      />
      {Object.keys(jobSolution).length !== 0 && (
        <ViewerGraph
          steps={jobSolution.steps}
          onStateSelect={handleStateSelect}
          graphData={transformToGraphData(jobSolution.states)}
        />
      )}
    </div>
  );
};

export default Viewer;
