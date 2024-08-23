import { TextInput } from "@/app/components/reusable-components/input/text-input";
import { ColumnTags } from "../create-project/components/column-tags";
import { CreateProjectValidationInitialProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import {
  Columns,
  createProjectValidationInitial,
} from "@/app/dashboard/hooks/projects/sql/utils/constant";
import { RequiredColumnEntry } from "./components/required-column-entry";
import { useEffect, useState, useContext } from "react";
import { RequiredColumnProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import { ButtonComponent } from "@/app/components/reusable-components/button";
import { useFormik } from "formik";
import { createProjectValidation } from "@/app/dashboard/hooks/projects/sql/utils/helpers/validation";
import { sqlQueryGenerator } from "@/app/dashboard/hooks/projects/sql/utils/helpers/sql/sql-query-generator";
import { toast } from "react-hot-toast";
import { useLaboratoryNetworkRequest } from "@/app/dashboard/hooks/projects/sql/laboratory";
import { useEmrNetworkRequest } from "@/app/dashboard/hooks/projects/sql/emr";
import { useClaimsNetworkRequest } from "@/app/dashboard/hooks/projects/sql/claims";
import { sqlQueryContext } from "@/app/dashboard/context";

export function CreateProject() {
  const [columns, setColumns] = useState<Array<RequiredColumnProps>>(Columns);

  const {
    selectedColumns,
    setSelectedColumns,
    setPhase,
    setCount,
    handleSetCSV,
    handleSetProjectData
  } = useContext(sqlQueryContext);

  const {
    fetchResponse,
    isDone: labIsDone,
    dataset: labDataset,
    count: labCount,
    loading: labLoading,
  } = useLaboratoryNetworkRequest();

  const {
    fetchResponse: fetchEmrRes,
    isDone: emrIsDone,
    dataset: emrDataset,
    count: emrCount,
    loading: emrLoading,
  } = useEmrNetworkRequest();

  const {
    fetchResponse: fetchClaimsRes,
    isDone: claimsIsDone,
    dataset: claimsDataset,
    count: claimsCount,
    loading: claimsLoading,
  } = useClaimsNetworkRequest();

  function updateDataSets(payload: RequiredColumnProps) {
    const isPresent =
      selectedColumns.filter(({ id }) => payload.id === id).length > 0;

    const selectedColumn = columns.map((column) => {
      if (column.id === payload.id) {
        return { ...column, isSelected: !column.isSelected };
      } else return { ...column };
    });

    setColumns(selectedColumn);

    if (isPresent) {
      const updatedDataSets = selectedColumns.filter(
        ({ id }) => payload.id !== id
      );
      setSelectedColumns(updatedDataSets);
      return;
    }

    setSelectedColumns(selectedColumns.concat(payload));
  }

  const formik = useFormik<CreateProjectValidationInitialProps>({
    initialValues: createProjectValidationInitial,
    validationSchema: createProjectValidation,
    onSubmit: (payload) => {
      if (!selectedColumns.length) {
        toast.error("Select a standard column header");
        return;
      }

      const sqlQueries = sqlQueryGenerator({
        entries: payload,
        selection: selectedColumns,
      });

      void fetchResponse({ payload: sqlQueries });
      void fetchEmrRes({ payload: sqlQueries });
      void fetchClaimsRes({ payload: sqlQueries });
    },
  });

  function updateEntries({ id, entries, exclude }: RequiredColumnProps) {
    const updatedEntries = selectedColumns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          entries: entries ?? column.entries,
          exclude: exclude ?? column.exclude,
        };
      } else return { ...column };
    });

    setSelectedColumns(updatedEntries as Array<RequiredColumnProps>);
  }

  useEffect(() => {
    if (
      !labLoading &&
      !emrLoading &&
      !claimsLoading &&
      labIsDone &&
      emrIsDone &&
      claimsIsDone
    ) {
      handleSetCSV("laboratory", labDataset as any);
      handleSetCSV("emr", emrDataset as any);
      handleSetCSV("claims", claimsDataset as any);

      setCount(emrCount + labCount + claimsCount);

      handleSetProjectData({
        projectName: formik.values.projectName,
        sampleSize: formik.values.sampleSize,
        startDate: formik.values.startDate,
        endDate: formik.values.endDate
      })

      console.log(emrCount, labCount, claimsCount, "cumulation");

      setPhase(1);
    }
  }, [
    labLoading,
    emrLoading,
    claimsLoading,
    emrCount,
    labCount,
    claimsCount,
    labIsDone,
    emrIsDone,
    claimsIsDone,
  ]);

  useEffect(() => {
    const newSelectedColumns = columns.map((x) => {
      if (selectedColumns.find((y) => y.id === x.id)) {
        return {
          ...x,
          isSelected: true,
        };
      } else return { ...x };
    }, []);

    setColumns(newSelectedColumns);
  }, []);

  return (
    <section>
      <p className={"font-[600] text-black text-[1.1rem]"}>Project Details</p>

      <p className={"text-black text-[0.9rem] mt-[0.3rem]"}>
        Please input a valid project name and other details below.
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className={"w-[20rem]"}>
          <TextInput
            onChange={formik.handleChange}
            value={formik.values.projectName}
            label={"Project name"}
            className={"rounded-xl"}
            name={"projectName"}
            error={formik.errors.projectName}
          />
        </div>

        <div className={"w-full"}>
          <ColumnTags
            onSelect={(payload) => updateDataSets(payload)}
            data={columns}
          />

          <div className={"mt-[2rem]"}>
            {selectedColumns.map(({ column, entries, exclude, id }, index) => (
              <RequiredColumnEntry
                requiredColumn={column}
                requiredEntry={entries}
                excludedEntry={exclude}
                onChange={updateEntries}
                key={index}
                id={id}
              />
            ))}
          </div>

          <div>
            <p className={"text-black text-[0.9rem] mt-[0.3rem]"}>
              Dataset Observation Period.
            </p>
            <div className={"flex mt-[.4rem] gap-[1rem]"}>
              <div className={"w-[48%]"}>
                <TextInput
                  onChange={formik.handleChange}
                  value={formik.values.startDate}
                  name={"startDate"}
                  label={"Start Date"}
                  type={"date"}
                  error={formik.errors.startDate}
                />
              </div>
              <div className={"w-[48%]"}>
                <TextInput
                  onChange={formik.handleChange}
                  value={formik.values.endDate}
                  name={"endDate"}
                  label={"End Date"}
                  type={"date"}
                  error={formik.errors.endDate}
                />
              </div>
            </div>
            <div className={"mt-5"}>
              <div className={"w-[48%]"}>
                <TextInput
                  onChange={formik.handleChange}
                  value={formik.values.sampleSize}
                  name={"sampleSize"}
                  label={"Sample Size"}
                  type={"number"}
                  error={formik.errors.sampleSize}
                />
              </div>
            </div>
          </div>
          <div className={"flex mt-[1rem] gap-[1rem] mb-[2rem]"}>
            <ButtonComponent type={"button"}>Cancel</ButtonComponent>
            <ButtonComponent
              loading={labLoading && emrLoading && claimsLoading}
            >
              {labLoading && emrLoading && claimsLoading
                ? "Loading..."
                : "Next"}
            </ButtonComponent>
          </div>
        </div>
      </form>
    </section>
  );
}
