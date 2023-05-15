import React, { useEffect, useState } from "react";
import "./FixedTable.scss";

const FixedTable = ({ setCompleted, activeStep, tableData, setTableData }) => {
  const [fixedRowToggle, setFixedRowToggle] = useState({});
  const [customTableData, setCustomTableData] = useState(tableData);

  useEffect(() => {
    setCompleted((prev) => ({ ...prev, [activeStep]: true }));
  }, [activeStep]);

  useEffect(() => {
    const tableDataLength = tableData.field_data.length;

    const toggleObj = {};

    for (let i = 0; i < tableDataLength; i++) {
      toggleObj[i] = false;
    }

    setFixedRowToggle(toggleObj);
  }, [tableData]);

  console.log(customTableData);

  return (
    <div className="fixedTable">
      {fixedRowToggle[0] !== undefined && (
        <>
          <div className="fixedTableHeader">
            {customTableData.field_list.map((com, idx) => {
              return <div key={idx}>{com.field_label}</div>;
            })}
          </div>
          <div className="fixedTableBody">
            {customTableData.field_data.map((com, idx) => {
              return (
                <div key={idx} className="fixedTableBodyDetail">
                  {customTableData.field_list.map((com2, idx2) => {
                    return <div key={idx2}>{com[com2.field_name]}</div>;
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FixedTable;
