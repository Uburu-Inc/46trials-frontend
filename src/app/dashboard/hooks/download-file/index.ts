import axios from "axios";
import { DownloadFileSync, DownloadFileAsync } from "./type";

export function useDownloadFile() {
  function downLoadFileSync({ extention, format, name }: DownloadFileSync) {
    let csvFile;
    let downloadLink;

    csvFile = new Blob([extention], { type: format });
    downloadLink = document.createElement("a");
    downloadLink.download = name;
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  async function downloadFileAsync({
    url,
    extention,
    format,
    name,
  }: DownloadFileAsync) {
    try {
      const response = await axios({
        url: url,
        method: "GET",
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: format });

      const link = document.createElement("a");
      const objectUrl = window.URL.createObjectURL(blob);

      link.href = objectUrl;
      link.download = `${name}.${extention}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return { downLoadFileSync, downloadFileAsync };
}
