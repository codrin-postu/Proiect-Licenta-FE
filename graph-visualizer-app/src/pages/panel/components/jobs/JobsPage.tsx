import React, { useEffect } from "react";
import { getPanelJobs, getPanelSolution } from "../../../../api/admin";

import { DataGrid } from "@mui/x-data-grid";
import { JOB_COLUMNS } from "../../../../common/constants";
import JobsDropdownMenu from "./JobsDropdown";

const JobsPage: React.FC = () => {
  const [data, setData] = React.useState<any>([]);
  const [selectedRowData, setSelectedRowData] = React.useState<any>(null);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const newData = await getPanelJobs();
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleMenuClick = async (action: string, rowId: string) => {
    const selectedRow = data.find((row: any) => row.id === rowId);
    setSelectedRowData(selectedRow);
    switch (action) {
      case "download":
        const solution = await getPanelSolution(selectedRow.id);
        console.log(solution);
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(solution)], {
          type: "application/json",
        });
        element.href = URL.createObjectURL(file);
        element.download = `job-${selectedRow.id}.json`;
        document.body.appendChild(element);
        element.click();

        break;
      default:
        break;
    }
  };

  return (
    <div className="panel">
      <div className="panel__section">
        <h1 className="panel__section__title">Problems</h1>
        <DataGrid
          className="panel__grid"
          disableColumnMenu
          autoHeight
          rows={data ? data : []}
          columns={[
            ...JOB_COLUMNS,
            {
              field: "actions",
              headerName: "Actions",

              width: 80,
              minWidth: 0,
              flex: 0,
              sortable: false,
              renderCell: (params: any) => (
                <JobsDropdownMenu
                  row={params.row}
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
    </div>
  );
};

export default JobsPage;
