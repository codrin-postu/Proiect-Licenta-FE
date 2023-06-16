import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Dialog,
} from "@mui/material";
import { getAlgorithms, getFields, getProblems } from "../../api/graph";
import "./Wizard.scss";

interface WizardProps {
  isOpen: boolean;
  onProblemDataSelect: (
    problemId: string,
    problemName: string,
    problemDescription: string,
    algorithmId: string,
    algorithmName: string,
    algorithmDescription: string,
    problemData: object
  ) => void;
}

const Wizard: React.FC<WizardProps> = ({ isOpen, onProblemDataSelect }) => {
  const steps = [
    "Choose the problem",
    "Choose the algorithm",
    "Problem Details",
  ];
  const [problems, setProblems] = useState<any>([]);
  const [algorithms, setAlgorithms] = useState<any>([]);
  const [problemFields, setProblemFields] = useState<any>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [chosenProblem, setChosenProblem] = useState("");
  const [chosenAlgorithm, setChosenAlgorithm] = useState("");
  const [chosenProblemData, setChosenProblemData] = useState({});

  useEffect(() => {
    fetchProblems();
    currentStep === 0 && setChosenProblem("");
  }, []);

  useEffect(() => {
    if (chosenProblem !== "") {
      fetchAlgorithm(chosenProblem);
      fetchProblemFields(chosenProblem);
    }
  }, [chosenProblem]);

  const fetchProblems = async () => {
    try {
      const data = await getProblems();
      setProblems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAlgorithm = async (problemId: string) => {
    try {
      const data = await getAlgorithms(problemId);
      setAlgorithms(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProblemFields = async (problemId: string) => {
    try {
      const data = await getFields(problemId);
      setProblemFields(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = () => {
    setCurrentStep(0);
    setChosenProblem("");
    return onProblemDataSelect(
      chosenProblem,
      problems.find((problem: any) => problem.id == chosenProblem).name,
      problems.find((problem: any) => problem.id == chosenProblem).description,
      chosenAlgorithm,
      algorithms.find(
        (algorithm: any) => algorithm.algorithm.id == chosenAlgorithm
      ).algorithm.name,
      algorithms.find(
        (algorithm: any) => algorithm.algorithm.id == chosenAlgorithm
      ).algorithm.description,
      chosenProblemData
    );
  };

  const handleSteps = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="wizard__content">
            <FormControl className="wizard__form">
              <FormLabel
                className="wizard__form-label"
                id="problem-choosing-group"
              >
                Problems
              </FormLabel>
              <RadioGroup
                aria-labelledby="problem-choosing-group"
                name="problem-choosing-group"
                value={chosenProblem}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setChosenProblem((event.target as HTMLInputElement).value)
                }
              >
                {problems.map((problem) => (
                  <FormControlLabel
                    key={problem.id}
                    value={problem.id}
                    control={<Radio />}
                    label={problem.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <div className="wizard__button-group">
              <Button
                disabled={chosenProblem === ""}
                className="next-button"
                size="small"
                onClick={() => setCurrentStep(currentStep + 1)}
                variant="contained"
              >
                Next
              </Button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="wizard__content">
            <FormControl className="wizard__form">
              <FormLabel
                className="wizard__form-label"
                id="problem-choosing-group"
              >
                Choose the algorithm
              </FormLabel>
              <RadioGroup
                aria-labelledby="algorithm-choosing-group"
                name="algorithm-choosing-group"
                value={chosenAlgorithm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setChosenAlgorithm((event.target as HTMLInputElement).value)
                }
              >
                {algorithms.map((algPb) => (
                  <FormControlLabel
                    key={algPb.algorithm.id}
                    value={algPb.algorithm.id}
                    control={<Radio />}
                    label={algPb.algorithm.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <div className="wizard__button-group">
              <Button
                disabled={chosenAlgorithm === ""}
                className="next-button"
                size="small"
                onClick={() => setCurrentStep(currentStep + 1)}
                variant="contained"
              >
                Next
              </Button>
              <Button
                size="small"
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="contained"
              >
                Previous
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="wizard__content">
            <FormControl className="wizard__form">
              <FormLabel
                className="wizard-form-label"
                id="problem-choosing-group"
              >
                Problem Details
              </FormLabel>
              {problemFields.map((data) => (
                <TextField
                  className="wizard__form-input"
                  key={data.id}
                  id={data.id}
                  label={data.name}
                  value={
                    chosenProblemData[
                      data.id as keyof typeof chosenProblemData
                    ] || 1
                  }
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setChosenProblemData((currData) => {
                      return { ...currData, [data.id]: event.target.value };
                    })
                  }
                  type="number"
                  InputProps={{
                    inputProps: { min: 1, max: data.max_value },
                  }}
                />
              ))}
            </FormControl>
            <div className="wizard__button-group">
              <Button
                size="small"
                onClick={() => handleComplete()}
                variant="contained"
              >
                Complete
              </Button>
              <Button
                size="small"
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="contained"
              >
                Previous
              </Button>
            </div>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <Dialog open={isOpen}>
      <Box className="wizard" sx={{ width: "100%" }}>
        <h1 className="wizard__title">Algorithm Graph Visualizer</h1>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {handleSteps(currentStep)}
      </Box>
    </Dialog>
  );
};

export default Wizard;
