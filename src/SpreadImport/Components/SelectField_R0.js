import React, { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./SelectField.scss";

const SelectField = ({ setSelectXlsxData, xlsxData, handleStepComplete }) => {
  const sheetList = useMemo(() => {
    return xlsxData.map((com) => com.name);
  }, [xlsxData]);

  console.log(xlsxData);

  const [selectSheet, setSelectSheet] = useState(xlsxData[0]["name"]);

  const sheetFieldList = useMemo(() => {
    const selected = xlsxData.find((com) => com.name === selectSheet);

    const selectedUniqKeys = selected["data"].map((com) => Object.keys(com));

    const selectedUniqKey = _.uniq(selectedUniqKeys.flat());

    const selectedValue = selected["data"].map((com) => Object.values(com));

    selectedValue.unshift(selectedUniqKey);

    return selectedValue.flat().length === 0 ? [] : selectedValue;
  }, [selectSheet, xlsxData]);

  const [sheetField, setSheetField] = useState(null);
  const [sheetFieldIndex, setSheetFieldIndex] = useState(0);

  const handleField = useCallback(
    (name) => {
      const selected = xlsxData.find((com) => com.name === name);

      const selectedUniqKeys = selected["data"].map((com) => Object.keys(com));

      const selectedUniqKey = _.uniq(selectedUniqKeys.flat());

      const selectedValue = selected["data"].map((com) => Object.values(com));

      selectedValue.unshift(selectedUniqKey);

      setSheetField(
        selectedValue[0] === undefined ? "없음" : selectedValue[0].join()
      );
    },
    [xlsxData]
  );

  useEffect(() => {
    if (selectSheet && sheetField) {
      const selected = xlsxData.find((com) => com.name === selectSheet);

      const xlsxDataCustom = {
        ...selected,
        idx: sheetFieldIndex,
        header: sheetFieldList[sheetFieldIndex],
        customData: selected.data.slice(sheetFieldIndex, selected.data.length),
      };

      setSelectXlsxData(xlsxDataCustom);

      handleStepComplete();
    }
  }, [selectSheet, sheetField, sheetFieldList]);

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
              handleField(e.target.value);
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
            사용할 Header를 선택하여 주세요
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={sheetField}
            name="radio-buttons-group"
            onChange={(e) => {
              setSheetFieldIndex(Number(e.target.name));
              setSheetField(e.target.value);
            }}
          >
            {sheetFieldList.map((com, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={com.join()}
                  control={<Radio />}
                  label={com.join()}
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
