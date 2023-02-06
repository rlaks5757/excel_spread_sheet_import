import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./MakeFieldList.scss";

const MakeFieldList = ({
  setFieldListToggle,
  setFieldList,
  setUseField,
  fieldList,
  fieldListToggle,
  useField,
}) => {
  const [fieldListCom, setFieldListCom] = useState(true);

  const handleToggle = () => {
    if (fieldListToggle && fieldListCom) {
      setFieldListToggle(false);
      setTimeout(() => setFieldListCom(false), 300);
    } else {
      setFieldListToggle(true);
      setFieldListCom(true);
    }
  };

  const handleFieldList = (type) => {
    const resetUseField = useField.map((com) => ({ ...com, field_name: "" }));

    setUseField([...resetUseField]);

    if (type === "add") {
      fieldList.push("");
    } else {
      if (fieldList.length === 1) return;

      fieldList.pop();
    }

    setFieldList([...fieldList]);
  };

  const changeFieldListContents = (e, idx) => {
    const resetUseField = useField.map((com) => ({ ...com, field_name: "" }));
    setUseField([...resetUseField]);

    fieldList[idx] = e.target.value.replace(reg, "");
    setFieldList([...fieldList]);
  };

  return (
    <div className="makeFieldList">
      <div className="makeFieldListLeft" onClick={handleToggle}>
        ...
      </div>
      {fieldListCom && (
        <div
          className={
            fieldListToggle
              ? "makeFieldListRight open"
              : "makeFieldListRight close"
          }
        >
          <h3 className="makeFieldListTitle">Field List 작성</h3>
          <div className="makeFieldListAddButton">
            <Button
              variant="outlined"
              sx={{ width: "100px" }}
              onClick={() => handleFieldList("add")}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              sx={{ width: "100px" }}
              onClick={() => handleFieldList("remove")}
            >
              제거
            </Button>
          </div>
          <div className="makeFieldListInputArea">
            {fieldList.map((com, idx) => {
              return (
                <TextField
                  key={idx}
                  id="filled-basic"
                  label="Field Name"
                  variant="filled"
                  sx={{ marginTop: "10px", width: "280px" }}
                  onChange={(e) => changeFieldListContents(e, idx)}
                  value={com}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeFieldList;

let reg = /[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
