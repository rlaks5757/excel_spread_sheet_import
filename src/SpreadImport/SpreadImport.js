import React, { useState } from "react";
import Button from "@mui/material/Button";
import WorkFlow from "./Components/WorkFlow";
import FileAttach from "./Components/FileAttach";
import "./SpreadImport.scss";

const SpreadImport = ({ handleToggle, toggleButton, animationBoolean }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const [selectXlsxData, setSelectXlsxData] = useState({});

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
            toggleButton={toggleButton}
            handleStepComplete={handleStepComplete}
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
