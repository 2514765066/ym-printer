interface RawPrinterTask {
  ID: number;
  DocumentName: string;
  JobStatus: string;
}

export const formatPrinterTask = (rawTask: RawPrinterTask) => {
  return {
    id: rawTask.ID,
    name: rawTask.DocumentName,
    status: rawTask.JobStatus.split(",").map(s => s.trim()),
  };
};
