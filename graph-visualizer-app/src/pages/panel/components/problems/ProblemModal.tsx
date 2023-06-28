import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Switch,
  Button,
  FormControlLabel,
} from "@mui/material";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { postPanelProblem } from "../../../../api/admin";

interface ProblemModalProps {
  isOpen: boolean;
  type: "add" | "edit";
  onClose: () => void;
  onSubmit: () => void;
  initialData?: {
    id?: string;
    name?: string;
    description?: string;
    is_active?: boolean;
  };
}

const ProblemModal: React.FC<ProblemModalProps> = ({
  initialData,
  isOpen,
  type,
  onClose,
  onSubmit,
}) => {
  const [inputData, setInputData] = useState<any>({});
  const [error, setError] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setInputData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    try {
      await postPanelProblem(inputData, type);

      onSubmit();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: "An error occurred. Please try again." });
      }
    }
  };

  const handleClose = () => {
    setInputData({});
    setError({});
    onClose();
  };

  const dialogTitle = () => {
    switch (type) {
      case "add":
        return "Add new problem";
      case "edit":
        return "Edit problem";
      default:
        return "";
    }
  };

  //   const handleDescriptionChange = (content, delta, source, editor) => {
  //     setDescription(editor.getContents());
  //   };

  const isSaveDisabled =
    !inputData.id || !inputData.name || !inputData.description;

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{dialogTitle()}</DialogTitle>
        <DialogContent>
          {error && error.general && (
            <p style={{ color: "red", marginBottom: 16 }}>{error.general}</p>
          )}
          <TextField
            label="ID"
            value={inputData.id}
            onChange={(e) => setInputData({ ...inputData, id: e.target.value })}
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
          <FormControlLabel
            control={
              <Switch
                checked={inputData.is_active}
                onChange={(e) =>
                  setInputData({ ...inputData, is_active: e.target.checked })
                }
              />
            }
            label="Is Active?"
            sx={{ mb: 2 }}
          />
          <ReactQuill
            value={inputData.description}
            onChange={(content, delta, source, editor) => {
              setInputData({ ...inputData, description: content });
            }}
            placeholder="description"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                ["code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                ["link"],
                ["clean"],
              ],
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
            style={{ height: 200, marginBottom: 16 }}
          />
          {error && error.description && (
            <p style={{ color: "red" }}>{error.description}</p>
          )}
          <Button
            disabled={isSaveDisabled}
            sx={{ mt: 8 }}
            variant="contained"
            onClick={handleSubmit}
          >
            {type === "add" ? "Add" : "Edit"}
          </Button>
          <Button
            sx={{ mt: 8, ml: 2 }}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProblemModal;
