import { useState, useContext } from "react";
import { CheckBox } from "./check-box";
import { db } from "./constant";
import styles from "./index.module.css";
import { GlobeIcon } from "./globe-icon";
import { ButtonComponent } from "@/components/button";
import { Tag } from "../../../tag";
import { sqlQueryContext } from "../../../../context";

export const SearchFilterMainSection = () => {
  const { count, setPhase, selectedColumns, lab, emr, claims } =
    useContext(sqlQueryContext);

  const [open, setOpen] = useState(false);

  function downloadCSV(csv: string, filename: string) {
    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  return (
    <>
      <div className={styles.search_filter_main_section}>
        <div className={styles.search_filter_database_container}>
          {db.map(({ dbName, description }, index) => (
            <div key={index} className={styles.search_filter_menu_control}>
              <div>
                <GlobeIcon />
              </div>
              <div>
                <p>{dbName}</p>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.search_filter_main_section_area}>
          <div>
            <p className={styles.search_filter_main_title}>Search Data Source</p>
            <p className={styles.search_filter_main_description}>
              Search/select the diagnosis relating to your study below to see volume
              of records and data available
            </p>
            <p className={styles.search_filter_main_tags_text}>Your Tags</p>
            <div className={styles.search_filter_main_tags_flex_container}>
              {selectedColumns.map(({ column }, index) => (
                <Tag
                  key={index}
                  label={column ?? ""}
                  className={styles.search_filter_main_tags_box}
                />
              ))}
            </div>

            <p className={styles.search_filter_available_unique_record_text}>
              Available Unique Records
            </p>
            <div className={styles.search_filter_available_unique_record_container}>
              <p>{count}</p>
            </div>

            <CheckBox
              label={"Select/Assign Data Source"}
              className={styles.search_filter_checkbox}
            />
          </div>

          <div className={styles.search_filter_main_area_bottom_section}>
            <div className={styles.search_filter_main_area_button_container}>
              <ButtonComponent
                onClick={() => {
                  setPhase(0);
                }}>
                Back
              </ButtonComponent>
              {/* <ButtonComponent onClick={() => setOpen(true)}>
                Export for Intergration
              </ButtonComponent> */}
              <ButtonComponent onClick={() => {
                downloadCSV(lab, "lab.xlsx");
                downloadCSV(emr, "emr.xlsx");
                downloadCSV(claims, "claims.xlsx");
              }}>
                Download
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>

      {/* <GlobalAppModal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.assigned_data_source}>
        <p className={styles.assigned_data_source_text}>Assigned Data Sources</p>
        <div className={styles.assigned_data_source_tag_container}>
          <Tag label={"001DB"} className={styles.assigned_data_source_tags} />
          <Tag label={"001DB"} className={styles.assigned_data_source_tags} />
        </div>
        <p className={styles.assigned_data_source_text_2}>
          Review assigned Data Sources and click the button below to assign more data
          sources or move the data for integration.
        </p>
        <div className={styles.assigned_data_source_button_container}>
          <div className={styles.assigned_data_source_main_container}>
            <ButtonComponent>Select More</ButtonComponent>
            <ButtonComponent>Continue</ButtonComponent>
          </div>
        </div>
      </GlobalAppModal> */}
    </>
  );
};
