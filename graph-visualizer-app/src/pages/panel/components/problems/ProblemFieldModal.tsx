import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

import "react-quill/dist/quill.snow.css";
import {
  getPanelProblemFields,
  postPanelProblemFields,
} from "../../../../api/admin";
import { DataGrid } from "@mui/x-data-grid";
import { PROBLEM_FIELDS_COLUMNS } from "../../../../common/constants";

interface ProblemFieldModalProps {
  isOpen: boolean;
  problemId: string;
  onClose: () => void;
}

const ProblemFieldModal: React.FC<ProblemFieldModalProps> = ({
  isOpen,
  problemId,
  onClose,
}) => {
  const [type, setType] = useState<"add" | "edit">("add");
  const [showForm, setShowForm] = useState(false);

  const [selectedField, setSelectedField] = useState<any>({});

  const [fields, setFields] = useState([]);

  const [inputData, setInputData] = useState<any>({});

  const [error, setError] = useState<any>({});

  useEffect(() => {
    isOpen && fetchFieldsData();
  }, [problemId, isOpen]);

  const fetchFieldsData = async () => {
    const fieldsData = await getPanelProblemFields(problemId);
    setFields(fieldsData);
  };

  const handleFieldAdd = () => {
    setSelectedField({});
    setInputData({});
    setType("add");
    setShowForm(true);
  };

  const handleFieldEdit = (params: any) => {
    setSelectedField(params.row);
    setInputData(params.row);
    setType("edit");
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      await postPanelProblemFields(problemId, inputData, type);

      handleReturn();
      fetchFieldsData();
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
      await postPanelProblemFields(problemId, params, "delete");

      handleReturn();
      fetchFieldsData();
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
    setSelectedField({});
  };

  const handleClose = () => {
    setInputData({});
    setShowForm(false);
    setError({});
    onClose();
  };

  const isSaveDisabled =
    !inputData.id ||
    !inputData.name ||
    !inputData.description ||
    !inputData.max_value;

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Problem Fields</DialogTitle>
        <DialogContent style={{ minWidth: "550px" }}>
          {showForm ? (
            <>
              {error && error.general && (
                <p style={{ color: "red", marginBottom: 16 }}>
                  {error.general}
                </p>
              )}
              <TextField
                label="ID"
                value={inputData.id}
                onChange={(e) =>
                  setInputData({ ...inputData, id: e.target.value })
                }
                fullWidth
                sx={{ mb: 2, mt: 2 }}
                error={error && error.id}
                helperText={error && error.id && error.id[0]}
              />
              <TextField
                label="Name"
                value={inputData.name}
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
                error={error && error.name}
                helperText={error && error.name && error.name[0]}
              />
              <TextField
                label="Description"
                value={inputData.description}
                onChange={(e) =>
                  setInputData({ ...inputData, description: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
                error={error && error.description}
                helperText={error && error.description && error.description[0]}
              />
              <TextField
                label="Max Value"
                type="number"
                value={inputData.max_value}
                onChange={(e) =>
                  setInputData({ ...inputData, max_value: e.target.value })
                }
                fullWidth
                inputProps={{
                  min: 1,
                  max: 20,
                }}
                sx={{ mb: 2 }}
                error={error && error.max_value}
                helperText={error && error.max_value && error.max_value[0]}
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
                  onClick={() => handleDelete(selectedField)}
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
                rows={fields ? fields : []}
                columns={[
                  ...PROBLEM_FIELDS_COLUMNS,
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

export default ProblemFieldModal;
