import React, { useEffect, useState } from "react";

import BaseTable from "./Components/BaseTable";
import MappingTable from "./Components/MappingTable";
import MakeFieldList from "./Components/MakeFieldList";
import "./MappingHeader.scss";

const MappingHeader = ({ setCompleted, activeStep, selectXlsxData }) => {
  const [useField, setUseField] = useState([]);
  const [fieldList, setFieldList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  ]);
  const [fieldListToggle, setFieldListToggle] = useState(true);

  useEffect(() => {
    const max_length = selectXlsxData.max_length;

    const use_feild = [];

    for (let i = 0; i < max_length; i++) {
      use_feild.push({
        id: i,
        use: true,
        field_name: "",
        field_type: "",
        concat_field: [],
        concat_type: "",
      });
    }

    setUseField(use_feild);
  }, [selectXlsxData]);

  useEffect(() => {
    const use_list = useField.filter(
      (com) => com.use && com.field_name !== "" && com.field_type !== ""
    );

    const not_use_list = useField.filter(
      (com) => !com.use && com.field_name === "" && com.field_type === ""
    );

    if (
      use_list.length + not_use_list.length === useField.length &&
      use_list.length > 0
    ) {
      setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    } else {
      setCompleted((prev) => ({ ...prev, [activeStep]: false }));
    }
  }, [useField]);

  return (
    <div className="mappingHeader">
      {useField.length > 0 && (
        <>
          <BaseTable
            selectXlsxData={selectXlsxData}
            setUseField={setUseField}
            useField={useField}
          />
          <MappingTable
            selectXlsxData={selectXlsxData}
            setUseField={setUseField}
            useField={useField}
            fieldList={fieldList}
          />

          <MakeFieldList
            setFieldListToggle={setFieldListToggle}
            setFieldList={setFieldList}
            setUseField={setUseField}
            fieldList={fieldList}
            fieldListToggle={fieldListToggle}
            useField={useField}
          />
        </>
      )}
    </div>
  );
};

export default MappingHeader;

const obj = {
  field: "",
  label: "",
};
