import React, { useEffect } from "react";
import { getPanelAlgorithms, postPanelAlgorithm } from "../../../../api/admin";

import { DataGrid } from "@mui/x-data-grid";
import { ALGORITHM_COLUMNS } from "../../../../common/constants";
import { Button, Card } from "@mui/material";
import DeletePopup from "../../../../components/delete_popup/DeletePopup";
import AlgorithmModal from "./AlgorithmModal";
import AlgorithmDropdownMenu from "./AlgorithmDropdown";

interface AlgorithmsPageProps {}

const AlgorithmsPage: React.FC<AlgorithmsPageProps> = () => {
  const [data, setData] = React.useState<any>([]);
  const [selectedRowData, setSelectedRowData] = React.useState<any>(null);
  const [isAlgorithmModalOpen, setIsAlgorithmModalOpen] = React.useState(false);
  const [isAlgorithmModalType, setIsAlgorithmModalType] = React.useState<
    "add" | "edit"
  >("add");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const newData = await getPanelAlgorithms();
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
        setIsAlgorithmModalType("edit");
        setIsAlgorithmModalOpen(true);
        break;
      case "delete":
        setIsDeletePopupOpen(true);
        break;
      default:
        break;
    }
  };

  const handleAlgorithmModalClose = () => {
    setIsAlgorithmModalOpen(false);
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
      await postPanelAlgorithm(selectedRowData, "delete");

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
            setIsAlgorithmModalOpen(true);
            setIsAlgorithmModalType("add");
          }}
        >
          Add new algorithm
        </Button>
      </Card>
      <div className="panel__section">
        <h1 className="panel__section__title">Algorithms</h1>
        <DataGrid
          className="panel__grid"
          disableColumnMenu
          autoHeight
          rows={data ? data : []}
          columns={[
            ...ALGORITHM_COLUMNS,
            {
              field: "actions",
              headerName: "Actions",

              width: 80,
              minWidth: 0,
              flex: 0,
              sortable: false,
              renderCell: (params: any) => (
                <AlgorithmDropdownMenu
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
      <AlgorithmModal
        initialData={selectedRowData || {}}
        isOpen={isAlgorithmModalOpen}
        type={isAlgorithmModalType}
        onSubmit={handleSubmitData}
        onClose={handleAlgorithmModalClose}
      />
      <DeletePopup
        open={isDeletePopupOpen}
        onDelete={handlePopupDelete}
        onClose={handlePopupClose}
      />
    </div>
  );
};

export default AlgorithmsPage;
