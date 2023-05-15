import React, { useMemo } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import RefreshIcon from "@mui/icons-material/Refresh";
import useWindowDimensions from "../../../../Hooks/useWindowDimensions";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import "./MappingTable.scss";

const MappingTable = ({ setUseField, useField, fieldList, selectXlsxData }) => {
  const { height } = useWindowDimensions();

  const tableData = useMemo(() => {
    return selectXlsxData.table_data;
  }, [selectXlsxData]);

  const handleChange = (idx, event) => {
    const find_index = useField.findIndex((com) => com.id === idx);

    const find_indexs = useField.filter(
      (com) => com.field_name === event.target.value
    );

    // const find_indexs = useField.filter(
    //   (com) => com.field_name === event["FIELD_NAME"]
    // );

    if (find_indexs.length > 0) {
      find_indexs.forEach((com) => {
        const delete_index = useField.findIndex((com2) => com.id === com2.id);

        useField[delete_index]["field_label"] = "";
        useField[delete_index]["field_name"] = "";
        useField[delete_index]["field_type"] = "";
      });
    }

    const find_field_name = fieldList.find(
      (com) => com.FIELD_NAME === event.target.value
    );

    // const find_field_name = fieldList.find(
    //   (com) => com.FIELD_NAME === event["FIELD_NAME"]
    // );

    useField[find_index]["field_label"] = find_field_name["INPUT_LABEL"];
    useField[find_index]["field_name"] = find_field_name["FIELD_NAME"];
    useField[find_index]["field_type"] = find_field_name["DATA_TYPE"];

    setUseField([...useField]);
  };

  const handleFieldUse = (idx, boolean) => {
    const find_index = useField.findIndex((com) => com.id === idx);

    useField[find_index]["use"] = boolean;

    if (!boolean) {
      useField[find_index]["field_name"] = "";
      useField[find_index]["field_type"] = "";
    }

    setUseField([...useField]);
  };

  return (
    <div className="mappingTable">
      <div className="mappingTableContents">
        <h3 className="mappingTableTitle">Header Title 선택</h3>

        <div
          className="fieldMappingTableBody"
          style={{
            height: height * 0.9 - 180 - 40 - 40,
            width: useField.length * 270,
          }}
        >
          <table className="fieldMappingTable">
            <thead>
              <tr>
                {useField.map((com, idx) => {
                  return (
                    <th key={idx}>
                      <div
                        className="fieldMappingTableHeader"
                        style={{
                          width: "250px",
                        }}
                      >
                        <Select
                          id="demo-simple-select"
                          value={com.field_name}
                          onChange={(e) => handleChange(idx, e, "name")}
                          sx={{ width: "200px" }}
                          disabled={!com.use}
                        >
                          {fieldList.map((com2, idx) => (
                            <MenuItem value={com2.FIELD_NAME} key={idx}>
                              {com2.INPUT_LABEL}
                            </MenuItem>
                          ))}
                        </Select>

                        {/* <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={fieldList}
                          getOptionLabel={(user) => {
                            return user["FIELD_NAME"] || "!";
                          }}
                          getOptionSelected={(option, value) => {
                            return option["INPUT_LABEL"] === value;
                          }}
                          onChange={(e, n) => handleChange(idx, n, "name")}
                          sx={{ width: "200px" }}
                          renderInput={(params) => (
                            <TextField {...params} label="Movie" />
                          )}
                        /> */}
                        <div className="baseTableRowUse">
                          {useField[
                            useField.findIndex((com2) => com2.id === idx)
                          ]["use"] ? (
                            <Button
                              variant="contained"
                              sx={{ padding: "5px", minWidth: "0px" }}
                              onClick={() => handleFieldUse(idx, false)}
                            >
                              <CancelIcon sx={{ fontSize: 20 }} />
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              sx={{ padding: "5px", minWidth: "0px" }}
                              onClick={() => handleFieldUse(idx, true)}
                            >
                              <RefreshIcon sx={{ fontSize: 20 }} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tableData.map((com, idx) => {
                return (
                  <tr key={idx} className="baseTableColumn">
                    {com.map((com2, idx2) => {
                      return (
                        <td
                          key={idx2}
                          className={
                            useField[
                              useField.findIndex((com2) => com2.id === idx2)
                            ]["use"]
                              ? "baseTableRow"
                              : "baseTableRow notuse"
                          }
                        >
                          {com2}{" "}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MappingTable;
