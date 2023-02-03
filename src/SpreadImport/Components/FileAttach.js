import React, { useState, useRef, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";
import SelectField from "./SelectField";
import "./FileAttach.scss";

const FileAttach = ({
  setSelectXlsxData,
  toggleButton,
  handleStepComplete,
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
      raw: true,
    });

    const sheetList = workbook.SheetNames;

    sheetList.forEach((com, idx) => {
      const worksheet = workbook.Sheets[com];

      const json = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
        raw: false,
      });

      console.log(json);

      setXlsxData((prev) => [...prev, { id: idx, name: com, data: json }]);
    });

    // const reader = new FileReader();

    // reader.onload = (e) => {
    //   const data = e.target.result;
    //   const workbook = XLSX.read(data, { type: "array", cellDates: "rows" });

    //   const sheetList = workbook.SheetNames;

    //   sheetList.forEach((com, idx) => {
    //     const worksheet = workbook.Sheets[com];

    //     const json = XLSX.utils.sheet_to_json(worksheet);

    //     setXlsxData((prev) => [...prev, { id: idx, name: com, data: json }]);
    //   });
    // };

    // reader.readAsArrayBuffer(selectFile);
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
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

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
