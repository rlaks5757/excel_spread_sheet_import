import React, { useState } from "react";
import Button from "@mui/material/Button";
import SpreadImport from "./SpreadImport/SpreadImport";

const App = () => {
  const [toggleButton, setToggleButton] = useState(true);
  const [animationBoolean, setAnimationBoolean] = useState(true);

  const handleToggle = () => {
    if (toggleButton && animationBoolean) {
      setAnimationBoolean(false);
      setTimeout(() => setToggleButton(false), 300);
    } else {
      setToggleButton(true);
      setAnimationBoolean(true);
    }
  };

  return (
    <div className="App">
      <Button variant="outlined" onClick={handleToggle}>
        Open
      </Button>

      {toggleButton && (
        <SpreadImport
          handleToggle={handleToggle}
          toggleButton={toggleButton}
          animationBoolean={animationBoolean}
        />
      )}
    </div>
  );
};

export default App;
