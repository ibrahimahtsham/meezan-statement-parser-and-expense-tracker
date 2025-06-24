import { useState } from "react";

export function useMergeStatements() {
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [merged, setMerged] = useState(null);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setFileNames(selectedFiles.map((f) => f.name));
    setMerged(null);
  };

  return {
    files,
    setFiles,
    fileNames,
    setFileNames,
    merged,
    setMerged,
    handleFilesChange,
  };
}
