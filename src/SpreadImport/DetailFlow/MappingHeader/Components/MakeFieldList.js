import React, { useState } from "react";
import _ from "lodash";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import url from "../../../../url";
import "./MakeFieldList.scss";

const MakeFieldList = ({
  setFieldListToggle,
  setFieldList,
  fieldList,
  fieldListToggle,
  bplist,
}) => {
  const [fieldListCom, setFieldListCom] = useState(true);

  const [selectValue, setSelectValue] = useState("");

  const handleToggle = () => {
    if (fieldListToggle && fieldListCom) {
      setFieldListToggle(false);
      setTimeout(() => setFieldListCom(false), 300);
    } else {
      setFieldListToggle(true);
      setFieldListCom(true);
    }
  };

  const requestFieldList = async (e, n) => {
    const value = n["BP_TYPE"];

    // const value = e.target.value;

    const request_field_list = await axios.post(`${url}/getbpfieldlist`, {
      bp_name: value,
    });

    setFieldList(
      _.sortBy(
        _.uniqBy(request_field_list.data.data, "FIELD_NAME"),
        "INPUT_LABEL"
      )
    );
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
          <h3 className="makeFieldListTitle">BP 선택</h3>
          <div className="makeFieldListAddButton">
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">BP Selct</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="BP Selct"
                sx={{ width: "100%" }}
                onChange={requestFieldList}
                value={selectValue}
              >
                {bplist.length > 0 &&
                  bplist.map((com, idx) => {
                    return (
                      <MenuItem key={idx} value={com.BP_TYPE}>
                        {com.BP_NAME}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl> */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={bplist}
              getOptionLabel={(user) => {
                return user["BP_NAME"] || "!";
              }}
              getOptionSelected={(option, value) => {
                return option["BP_TYPE"] === value;
              }}
              onChange={(e, n) => requestFieldList(e, n)}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </div>
          <br />
          <h3 className="makeFieldListTitle">BP Field List</h3>
          <div className="makeFieldListInputArea">
            {fieldList.length > 0 &&
              fieldList.map((com, idx) => {
                return (
                  <div className="makeFieldListDetail" key={idx}>
                    {com.INPUT_LABEL}
                  </div>
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
