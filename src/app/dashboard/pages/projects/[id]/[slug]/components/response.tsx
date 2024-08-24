"use client";

import { InfoListView } from "@/app/dashboard/components/info-list-view";
import { useDownloadFile } from "@/app/dashboard/hooks/download-file";

interface Props {
  name: string;
  date: string;
  list: Array<{ id: number; file: string }>;
}

export function Response({ name, date, list }: Props) {
  const { downloadFileAsync } = useDownloadFile();

  function initDownload(url: string) {
    downloadFileAsync({
      name: name,
      url: url,
      format: "text/csv",
      extention: "csv",
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
          onDownload={() => initDownload(item.file)}
        />
      ))}
    </>
  );
}
