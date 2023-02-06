import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "react-data-grid/lib/styles.css";
import "./SelectField.scss";

const SelectField = ({
  setSelectXlsxData,
  xlsxData,
  setCompleted,
  activeStep,
}) => {
  const [selectSheet, setSelectSheet] = useState(xlsxData[0]["name"]);
  const [sheetField, setSheetField] = useState(null);

  const sheetList = useMemo(() => {
    return xlsxData.map((com) => com.name);
  }, [xlsxData]);

  const sheetFieldList = useMemo(() => {
    const selected = xlsxData.find((com) => com.name === selectSheet);

    const selectedValue = selected["data"];

    return selectedValue;
  }, [selectSheet, xlsxData]);

  useEffect(() => {
    if (sheetField !== null) {
      setCompleted((prev) => ({ ...prev, [activeStep]: true }));

      const slice_list = sheetFieldList.slice(
        sheetField,
        sheetFieldList.length
      );

      const slice_list_max_length = _.maxBy(
        slice_list.map((com) => com.length)
      );

      const data_obj = {
        sheetName: selectSheet,
        table_data: slice_list,
        max_length: slice_list_max_length,
      };

      setSelectXlsxData((prev) => ({ ...prev, ...data_obj }));
    } else {
      setCompleted((prev) => ({ ...prev, [activeStep]: false }));

      const data_obj = {
        sheetName: null,
        table_data: [],
        max_length: 0,
      };

      setSelectXlsxData((prev) => ({ ...prev, ...data_obj }));
    }
  }, [sheetField, activeStep, setCompleted]);

  const handleFieldLabel = (arr) => {
    const create_label = arr.map((com, idx) => {
      return (
        <div className="radioFieldLabelDetail" key={idx}>
          <span>{com}</span>
        </div>
      );
    });

    return (
      <div className="radioFieldLabel" style={{ textOverflow: "ellipsis" }}>
        {create_label}
      </div>
    );
  };

  return (
    <div className="selectField">
      <div className="selectFieldLeft">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            사용할 Sheet를 선택하여 주세요
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={selectSheet}
            name="radio-buttons-group"
            onChange={(e) => {
              setSelectSheet(e.target.value);
              setSheetField(null);
            }}
          >
            {sheetList.map((com, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={com}
                  control={<Radio />}
                  label={com}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
      <div className="selectRight">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            사용할 Table Data 시작 지점을 선택하여 주시기 바랍니다.
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={sheetField}
            name="radio-buttons-group"
            onChange={(e) => {
              setSheetField(e.target.value);
            }}
          >
            {sheetFieldList.map((com, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={idx}
                  control={<Radio />}
                  label={handleFieldLabel(com)}
                  name={String(idx)}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default SelectField;
