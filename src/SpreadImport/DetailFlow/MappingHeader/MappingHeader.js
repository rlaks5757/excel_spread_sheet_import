import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseTable from "./Components/BaseTable";
import MappingTable from "./Components/MappingTable";
import MakeFieldList from "./Components/MakeFieldList";
import { url } from "../../../url";
import "./MappingHeader.scss";

const MappingHeader = ({
  setCompleted,
  activeStep,
  selectXlsxData,
  setTableData,
}) => {
  const [useField, setUseField] = useState([]);
  const [fieldList, setFieldList] = useState([]);
  const [fieldListToggle, setFieldListToggle] = useState(true);

  const [bplist, setBpList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request_bp_list = await axios.get(`${url}/getbplist`);

      setBpList(request_bp_list.data.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const max_length = selectXlsxData.max_length;

    const use_feild = [];

    for (let i = 0; i < max_length; i++) {
      use_feild.push({
        id: i,
        use: true,
        field_name: "",
        field_type: "",
        // concat_field: [],
        // concat_type: "",
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
      const use_data = useField.filter((com) => com.use);

      const tableDataSet = create_table_data(selectXlsxData, use_data);

      setTableData({
        field_list: use_data,
        field_data: tableDataSet,
      });

      setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    } else {
      setTableData({
        field_list: [],
        field_data: [],
      });
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
            bplist={bplist}
          />
        </>
      )}
    </div>
  );
};

export default MappingHeader;

const create_table_data = (xlsx_data, custom_field) => {
  const concat_data = xlsx_data.table_data.map((com) => {
    const data = {};
    custom_field.forEach((com2) => {
      const id = com2.id;

      data[com2.field_name] = handleDataType(com[id], com2.field_type);
    });

    return data;
  });

  return concat_data;
};

const handleDataType = (data, type) => {
  switch (type) {
    case "String":
      return String(data);
    case "Number":
      return Number(data);
    case "Date":
      return new Date(data);
    default:
      return String(data);
  }
};
