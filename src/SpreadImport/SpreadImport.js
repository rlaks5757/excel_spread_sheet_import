import React, { useState } from "react";
import Button from "@mui/material/Button";
import WorkFlow from "./DetailFlow/WorkFlow";
import FileAttach from "./DetailFlow/FileAttch/FileAttach";
import MappingHeader from "./DetailFlow/MappingHeader/MappingHeader";
import "./SpreadImport.scss";

const SpreadImport = ({ handleToggle, toggleButton, animationBoolean }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const [selectXlsxData, setSelectXlsxData] = useState({
    sheetName: null,
    table_data: [],
    max_length: 0,
  });

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleStepComplete = () => {
    setCompleted((prev) => ({ ...prev, [activeStep]: true }));
  };

  const handleComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <FileAttach
            setSelectXlsxData={setSelectXlsxData}
            setCompleted={setCompleted}
            activeStep={activeStep}
            toggleButton={toggleButton}
            handleStepComplete={handleStepComplete}
          />
        );
      case 1:
        return (
          <MappingHeader
            setCompleted={setCompleted}
            activeStep={activeStep}
            selectXlsxData={selectXlsxData}
          />
        );
      default:
        return "";
    }
  };

  return (
    <div className={`spreadImport ${animationBoolean ? "open" : "close"}`}>
      <button
        className="spreadImportCloseBtn"
        onClick={() => {
          handleToggle();
          setActiveStep(0);
          setCompleted({});
        }}
      >
        X
      </button>
      <div className="spreadImportContents">
        <div className="spreadImportContentsTop">
          <WorkFlow activeStep={activeStep} completed={completed} />
        </div>
        <div className="spreadImportContentsMiddle">
          {handleComponent()}
          {/* <Button onClick={handleStepComplete}>asd</Button> */}
        </div>
        <div className="spreadImportContentsBottom">
          {activeStep !== 3 ? (
            <Button
              variant="contained"
              sx={{ width: "300px" }}
              disabled={completed[activeStep] !== true}
              onClick={handleNextStep}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ width: "300px" }}
              disabled={completed[activeStep] !== true}
              onClick={() => {
                handleToggle();
                setActiveStep(0);
                setCompleted({});
              }}
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpreadImport;
