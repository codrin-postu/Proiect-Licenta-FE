import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import "react-quill/dist/quill.snow.css";
import {
  getPanelAlgorithms,
  getPanelProblemAlgorithms,
  postPanelProblemAlgorithms,
} from "../../../../api/admin";
import { DataGrid } from "@mui/x-data-grid";
import { PROBLEM_ALGORITHMS_COLUMNS } from "../../../../common/constants";

interface ProblemFieldModalProps {
  isOpen: boolean;
  problemId: string;
  onClose: () => void;
}

const ProblemAlgorithmModal: React.FC<ProblemFieldModalProps> = ({
  isOpen,
  problemId,
  onClose,
}) => {
  const [type, setType] = useState<"add" | "edit">("add");
  const [showForm, setShowForm] = useState(false);

  const [selectedPbAlgorithm, setSelectedPbAlgorithm] = useState<any>({});

  const [problemAlgorithm, setProblemAlgorithm] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);

  const [inputData, setInputData] = useState<any>({});

  const [error, setError] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      fetchProblemAlgorithmData();
      fetchAlgorithmData();
    }
  }, [problemId, isOpen]);

  const fetchProblemAlgorithmData = async () => {
    const pbAlgorithmData = await getPanelProblemAlgorithms(problemId);
    setProblemAlgorithm(pbAlgorithmData);
  };

  const fetchAlgorithmData = async () => {
    const algorithmsData = await getPanelAlgorithms();
    setAlgorithms(algorithmsData);
  };

  const handleFieldAdd = () => {
    setSelectedPbAlgorithm({});
    setInputData({});
    setType("add");
    setShowForm(true);
  };

  const handleFieldEdit = (params: any) => {
    setSelectedPbAlgorithm(params.row);
    setInputData(params.row);
    setType("edit");
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      await postPanelProblemAlgorithms(problemId, inputData, type);

      handleReturn();
      fetchProblemAlgorithmData();
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: "An error occurred. Please try again." });
      }
    }
  };

  const handleDelete = async (params: string) => {
    try {
      await postPanelProblemAlgorithms(problemId, params, "delete");

      handleReturn();
      fetchProblemAlgorithmData();
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: "An error occurred. Please try again." });
      }
    }
  };

  const handleReturn = () => {
    setShowForm(false);
    setError({});
    setSelectedPbAlgorithm({});
  };

  const handleClose = () => {
    setInputData({});
    setShowForm(false);
    setError({});
    onClose();
  };

  const isSaveDisabled = !inputData.algorithm_id || !inputData.is_active;

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Problem Algorithms</DialogTitle>
        <DialogContent style={{ minWidth: "550px" }}>
          {showForm ? (
            <>
              {error && error.general && (
                <p style={{ color: "red", marginBottom: 16 }}>
                  {error.general}
                </p>
              )}
              <InputLabel>Algorithm</InputLabel>
              {console.log(inputData)}
              <Select
                fullWidth
                value={inputData.algorithm_id || ""}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    algorithm_id: e.target.value,
                  })
                }
              >
                <MenuItem value="">Select an algorithm</MenuItem>
                {algorithms.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>

              <FormControlLabel
                style={{ width: "100%" }}
                control={
                  <Switch
                    checked={inputData.is_active}
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        is_active: e.target.checked,
                      })
                    }
                  />
                }
                label="Is Active?"
                sx={{ mt: 2 }}
              />

              <Button
                sx={{ mt: 4 }}
                variant="contained"
                disabled={isSaveDisabled}
                onClick={handleSubmit}
              >
                {type === "add" ? "Add" : "Update"}
              </Button>
              <Button
                sx={{ mt: 4, ml: 2 }}
                variant="contained"
                onClick={handleReturn}
              >
                Return
              </Button>
              {type === "edit" && (
                <Button
                  sx={{ mt: 4, ml: 2 }}
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(selectedPbAlgorithm)}
                >
                  Delete
                </Button>
              )}
            </>
          ) : (
            <>
              <DataGrid
                disableColumnMenu
                autoHeight
                rows={problemAlgorithm ? problemAlgorithm : []}
                columns={[
                  ...PROBLEM_ALGORITHMS_COLUMNS,
                  {
                    field: "actions",
                    headerName: "Actions",

                    width: 80,
                    minWidth: 0,
                    flex: 0,
                    sortable: false,
                    renderCell: (params: any) => (
                      <>
                        <Button onClick={() => handleFieldEdit(params)}>
                          Edit
                        </Button>
                      </>
                    ),
                  },
                ]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
              />
              <Button
                sx={{ mt: 4 }}
                variant="contained"
                onClick={handleFieldAdd}
              >
                Add New
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProblemAlgorithmModal;
