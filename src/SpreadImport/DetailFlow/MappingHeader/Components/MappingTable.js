import React from "react";
import _ from "lodash";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import "./MappingTable.scss";

const MappingTable = ({ selectXlsxData, setUseField, useField, fieldList }) => {
  const handleChange = (idx, event, type) => {
    const find_index = useField.findIndex((com) => com.id === idx);

    if (type === "name") {
      useField[find_index]["field_name"] = event.target.value;
    } else {
      useField[find_index]["field_type"] = event.target.value;
    }

    setUseField([...useField]);
  };

  return (
    <div className="mappingTable">
      <div className="mappingTableContents">
        <h3 className="mappingTableTitle">Table Column Data Type 선택</h3>

        <div className="fieldMapping">
          {useField.map((com, idx) => {
            return (
              <Select
                key={idx}
                id="demo-simple-select"
                value={com.field_type}
                onChange={(e) => handleChange(idx, e, "type")}
                sx={{ width: "100px", margin: "0px 10px" }}
                disabled={!com.use}
              >
                {field_type_array.map((com, idx) => (
                  <MenuItem value={com} key={idx}>
                    {com}
                  </MenuItem>
                ))}
              </Select>
            );
          })}
        </div>
      </div>

      <div className="mappingTableContents">
        <h3 className="mappingTableTitle" style={{ marginTop: "10px" }}>
          Header Title 선택
        </h3>

        <div className="fieldMapping">
          {useField.map((com, idx) => {
            return (
              <Select
                key={idx}
                id="demo-simple-select"
                value={com.field_name}
                onChange={(e) => handleChange(idx, e, "name")}
                sx={{ width: "100px", margin: "0px 10px" }}
                disabled={!com.use}
              >
                {_.uniq(fieldList.filter((com) => com !== "")).map(
                  (com, idx) => (
                    <MenuItem value={com} key={idx}>
                      {com}
                    </MenuItem>
                  )
                )}
              </Select>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MappingTable;

const test_field = [
  "name",
  "name2",
  "name3",
  "name4",
  "name5",
  "name6",
  "name7",
];

const field_type_array = ["String", "Number", "Date"];

const create_field_data = (useField) => {
  const obj_key_list = Object.keys(useField);

  const new_field_data = obj_key_list.map((com) => {
    return {
      id: com,
      use: useField[com],
      field_name: "test",
      field_type: "",
      concat_field: [],
      concat_type: "",
    };
  });

  return new_field_data;
};
