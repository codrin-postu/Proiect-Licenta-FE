import React, { useState } from "react";

import "./Panel.scss";
import AdminLeftPanel from "../../components/admin-left-panel/AdminLeftPanel";
import ProblemsPage from "./components/problems/ProblemsPage";
import AlgorithmsPage from "./components/algorithms/AlgorithmsPage";
import JobsPage from "./components/jobs/JobsPage";

interface PanelProps {}

const Panel: React.FC<PanelProps> = () => {
  const [selectedPage, setSelectedPage] = useState("problems");

  const renderPageComponent = () => {
    switch (selectedPage) {
      case "problems":
        return <ProblemsPage />;
      case "algorithms":
        return <AlgorithmsPage />;
      case "jobs":
        return <JobsPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <AdminLeftPanel
        onMenuClick={(id) => setSelectedPage(id)}
        selectedPage={selectedPage}
      />
      {renderPageComponent()}
    </>
  );
};

export default Panel;
