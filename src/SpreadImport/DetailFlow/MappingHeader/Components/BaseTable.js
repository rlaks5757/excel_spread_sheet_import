import React, { useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./BaseTable.scss";

const BaseTable = ({ selectXlsxData, setUseField, useField }) => {
  const tableData = useMemo(() => {
    return selectXlsxData.table_data;
  }, [selectXlsxData]);

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
    <div className="baseTable">
      <h3 className="baseTableTitle">기본 테이블</h3>
      <div className="baseTableContents">
        {tableData.map((com, idx) => {
          return (
            <div key={idx} className="baseTableColumn">
              {com.map((com2, idx2) => {
                return (
                  <div
                    key={idx2}
                    className={
                      useField[useField.findIndex((com) => com.id === idx2)][
                        "use"
                      ]
                        ? "baseTableRow"
                        : "baseTableRow notuse"
                    }
                  >
                    {com2}{" "}
                    <div className="baseTableRowUse">
                      {idx === 0 ? (
                        useField[useField.findIndex((com) => com.id === idx2)][
                          "use"
                        ] ? (
                          <Button
                            variant="contained"
                            sx={{ padding: "2px", minWidth: "0px" }}
                            onClick={() => handleFieldUse(idx2, false)}
                          >
                            <CancelIcon sx={{ fontSize: 20 }} />
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ padding: "2px", minWidth: "0px" }}
                            onClick={() => handleFieldUse(idx2, true)}
                          >
                            <RefreshIcon sx={{ fontSize: 20 }} />
                          </Button>
                        )
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BaseTable;
