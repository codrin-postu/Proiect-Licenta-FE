import React, { useEffect } from "react";
import { getPanelProblems, postPanelProblem } from "../../../../api/admin";

import { DataGrid } from "@mui/x-data-grid";
import { PROBLEM_COLUMNS } from "../../../../common/constants";
import { Button, Card } from "@mui/material";
import ProblemModal from "./ProblemModal";
import DeletePopup from "../../../../components/delete_popup/DeletePopup";
import ProblemDropdownMenu from "./ProblemDropdown";
import ProblemAlgorithmModal from "./ProblemAlgorithmModal";
import ProblemFieldModal from "./ProblemFieldModal";

interface ProblemsPageProps {}

const ProblemsPage: React.FC<ProblemsPageProps> = () => {
  const [data, setData] = React.useState<any>([]);
  const [selectedRowData, setSelectedRowData] = React.useState<any>(null);
  const [isProblemModalOpen, setIsProblemModalOpen] = React.useState(false);
  const [isProblemModalType, setIsProblemModalType] = React.useState<
    "add" | "edit"
  >("add");
  const [isProblemAlgorithmModalOpen, setIsProblemAlgorithmModalOpen] =
    React.useState(false);
  const [isProblemFieldModalOpen, setIsProblemFieldModalOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const newData = await getPanelProblems();
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleMenuClick = (action: string, rowId: string) => {
    const selectedRow = data.find((row: any) => row.id === rowId);
    setSelectedRowData(selectedRow);
    switch (action) {
      case "edit":
        setIsProblemModalType("edit");
        setIsProblemModalOpen(true);
        break;
      case "algorithms":
        setIsProblemAlgorithmModalOpen(true);
        break;
      case "fields":
        setIsProblemFieldModalOpen(true);
        break;
      case "delete":
        setIsDeletePopupOpen(true);
        break;
      default:
        break;
    }
  };

  const handleProblemModalClose = () => {
    setIsProblemModalOpen(false);
    setSelectedRowData(null);
  };

  const handleProblemAlgorithmModalClose = () => {
    setIsProblemAlgorithmModalOpen(false);
    setSelectedRowData(null);
  };

  const handleProblemFieldModalClose = () => {
    setIsProblemFieldModalOpen(false);
    setSelectedRowData(null);
  };

  const handleSubmitData = () => {
    fetchTableData();
  };

  const handlePopupClose = () => {
    setIsDeletePopupOpen(false);
    setSelectedRowData(null);
  };

  const handlePopupDelete = async () => {
    try {
      await postPanelProblem(selectedRowData, "delete");

      handlePopupClose();
      fetchTableData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="panel">
      <Card className="panel__card">
        <Button
          variant="contained"
          size="large"
          sx={{ width: "100%", height: "100%" }}
          onClick={() => {
            setIsProblemModalOpen(true);
            setIsProblemModalType("add");
          }}
        >
          Add new problem
        </Button>
      </Card>
      <div className="panel__section">
        <h1 className="panel__section__title">Problems</h1>
        <DataGrid
          className="panel__grid"
          disableColumnMenu
          autoHeight
          rows={data ? data : []}
          columns={[
            ...PROBLEM_COLUMNS,
            {
              field: "actions",
              headerName: "Actions",

              width: 80,
              minWidth: 0,
              flex: 0,
              sortable: false,
              renderCell: (params: any) => (
                <ProblemDropdownMenu
                  rowId={params.row.id}
                  onMenuClick={(action, rowId) =>
                    handleMenuClick(action, rowId)
                  }
                />
              ),
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
      </div>
      <ProblemModal
        initialData={selectedRowData || {}}
        isOpen={isProblemModalOpen}
        type={isProblemModalType}
        onSubmit={handleSubmitData}
        onClose={handleProblemModalClose}
      />
      <ProblemAlgorithmModal
        isOpen={isProblemAlgorithmModalOpen}
        problemId={selectedRowData ? selectedRowData.id : null}
        onClose={handleProblemAlgorithmModalClose}
      />
      <ProblemFieldModal
        isOpen={isProblemFieldModalOpen}
        problemId={selectedRowData ? selectedRowData.id : null}
        onClose={handleProblemFieldModalClose}
      />
      <DeletePopup
        open={isDeletePopupOpen}
        onDelete={handlePopupDelete}
        onClose={handlePopupClose}
      />
    </div>
  );
};

export default ProblemsPage;
