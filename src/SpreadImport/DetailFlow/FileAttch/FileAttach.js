import React, { useState, useRef, useCallback, useEffect } from "react";
import _ from "lodash";
import * as XLSX from "xlsx";
import SelectField from "./Components/SelectField";
import "./FileAttach.scss";

const FileAttach = ({
  setSelectXlsxData,
  toggleButton,
  handleStepComplete,
  setCompleted,
  activeStep,
}) => {
  const dragRef = useRef(null);
  const [file, setFile] = useState({});
  const [xlsxData, setXlsxData] = useState([]);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onChangeFiles = useCallback(async (e) => {
    let selectFile = {};

    if (e.type === "drop") {
      selectFile = e.dataTransfer.files[0];
    } else {
      selectFile = e.target.files[0];
    }

    if (
      selectFile.name.split(".")[1] === "xlsx" ||
      selectFile.name.split(".")[1] === "xls"
    )
      setFile(selectFile);

    const readFile = await readFileAsync(selectFile);

    const workbook = XLSX.read(readFile, {
      cellDates: true,
      dateNF: "yyyy-mm-dd",
      cellNF: true,
      raw: true,
      cellStyles: true,
    });

    const sheetList = workbook.SheetNames;

    sheetList.forEach((com, idx) => {
      const worksheet = workbook.Sheets[com];

      const json = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
        raw: false,
      });

      const json_max_length = _.maxBy(json.map((com) => com.length));

      const emtry_json = json.map((com) => {
        const new_arr = [];

        for (let i = 0; i < json_max_length; i++) {
          if (com[i] === undefined) {
            new_arr.push(null);
          } else {
            new_arr.push(com[i]);
          }
        }

        return new_arr;
      });

      setXlsxData((prev) => [
        ...prev,
        { id: idx, name: com, data: emtry_json },
      ]);
    });
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents, file]);

  const handleDeleteFile = () => {
    setFile({});
    setXlsxData([]);
  };

  useEffect(() => {
    if (!toggleButton) handleDeleteFile();
  }, [toggleButton]);

  return (
    <div className="fileAttach">
      {xlsxData.length === 0 ? (
        <>
          <input
            type="file"
            id="fileUpload"
            style={{ display: "none" }}
            multiple={false}
            onChange={onChangeFiles}
            accept=".xlsx, .xls"
          />
          <label
            className={"fileAttach-File"}
            htmlFor="fileUpload"
            ref={dragRef}
          >
            <div>.xlsx, .xls 파일을 첨부하여 주시기 바랍니다.</div>
          </label>
        </>
      ) : (
        <SelectField
          setSelectXlsxData={setSelectXlsxData}
          xlsxData={xlsxData}
          handleStepComplete={handleStepComplete}
          setCompleted={setCompleted}
          activeStep={activeStep}
        />
      )}
    </div>
  );
};

export default FileAttach;

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};
