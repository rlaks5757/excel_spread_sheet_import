import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import "./WorkFlow.scss";

const steps = ["파일 첨부", "Header 선택", "Table 입력", "완료"];

const WorkFlow = (props) => {
  const { activeStep, completed } = props;

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundColor: "#1976d2",
      // backgroundImage:
      //   "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundColor: "#1976d2",
      // backgroundImage:
      //   "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <div> {completed ? <CheckIcon sx={{ width: "20px" }} /> : 1} </div>,
      2: <div> {completed ? <CheckIcon sx={{ width: "20px" }} /> : 2} </div>,
      3: <div> {completed ? <CheckIcon sx={{ width: "20px" }} /> : 3} </div>,
      4: <div> {completed ? <CheckIcon sx={{ width: "20px" }} /> : 4} </div>,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[props.icon]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <div className="workFlow">
      <Box sx={{ width: "98%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default WorkFlow;
