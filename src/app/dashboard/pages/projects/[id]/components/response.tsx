"use client";

import { InfoListView } from "../../../../components/info-list-view";

interface Props {
  name: string;
  date: string;
  list: Array<{ id: number; file: string }>;
}

export function Response({ name, date, list }: Props) {
  function downloadFile(url: string, filename: string) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob);

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("There was a problem with the download:", error);
      });
  }
  return (
    <>
      {list.map((item, index) => (
        <InfoListView
          key={index}
          institution={name}
          location=""
          date={date}
          className="mt-10"
          onDownload={() => {
            downloadFile(`${name}.csv`, item.file);
          }}
        />
      ))}
    </>
  );
}
