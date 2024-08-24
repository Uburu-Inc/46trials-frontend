export type FileFormat = "text/csv";

export interface DownloadFileSync {
  extention: "csv" | "xlsx" | "txt" | "pdf" | "jpg" | "png" | "jpeg" | "gif";
  format: FileFormat;
  name: string;
}

export interface DownloadFileAsync extends DownloadFileSync {
  url: string;
}
