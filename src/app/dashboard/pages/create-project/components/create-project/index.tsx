import { TextInput } from "@/app/components/reusable-components/input/text-input";
import { ColumnTags } from "../create-project/components/column-tags";
import { CreateProjectValidationInitialProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import {
  Columns,
  createProjectValidationInitial,
} from "@/app/dashboard/hooks/projects/sql/utils/constant";
import { RequiredColumnEntry } from "./components/required-column-entry";
import { useEffect, useState, useContext, useRef } from "react";
import { RequiredColumnProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import { ButtonComponent } from "@/app/components/reusable-components/button";
import { useFormik } from "formik";
import { createProjectValidation } from "@/app/dashboard/hooks/projects/sql/utils/helpers/validation";
import { toast } from "react-hot-toast";
import { sqlQueryContext } from "@/app/dashboard/context";
import { createQuery } from "@/app/dashboard/hooks/projects/sql/utils/helpers/sql/queries/create-queries";
import { useSqlQueryRequest } from "@/app/dashboard/hooks/projects/sql/run-query";
import { useFetchDataDictionary } from "@/app/dashboard/hooks/projects/sql/fetch-data-dictionary";
import { Loader } from "@/app/components/reusable-components/loader";

export function CreateProject() {
  const [columns, setColumns] = useState<Array<RequiredColumnProps>>(Columns);

  const {
    success,
    loading: sendingQueries,
    data: queryResult,
    sendQuery,
  } = useSqlQueryRequest();

  const { loading, data } = useFetchDataDictionary();

  const {
    selectedColumns,
    setSelectedColumns,
    setPhase,
    setCount,
    setQueryResultPhase2,
    onSetQueryParams,
    setData,
  } = useContext(sqlQueryContext);

  const isQueried = useRef(false);

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
    onSubmit: function (payload) {
      if (!selectedColumns.length) {
        toast.error("Select a standard column header");
        return;
      }

      const countQuery = (data?.results ?? []).map(
        ({ table_name, code, data_dictionary }) => {
          return {
            sql: createQuery({
              selection: selectedColumns,
              table: table_name,
              action: "count",
              dictionaryConverter: data_dictionary,
              entries: {
                sampleSize: payload.sampleSize,
                startDate: payload.startDate,
                endDate: payload.endDate,
              },
            }),
            paid: false,
            action: "count",
            code,
          };
        }
      );

      const datasetQuery = (data?.results ?? []).map(
        ({ table_name, code, data_dictionary }) => {
          return {
            sql: createQuery({
              selection: selectedColumns,
              table: table_name,
              action: "dataset",
              dictionaryConverter: data_dictionary,
              entries: {
                sampleSize: payload.sampleSize,
                startDate: payload.startDate,
                endDate: payload.endDate,
              },
            }),
            paid: true,
            action: "dataset",
            code,
          };
        }
      );

      sendQuery(countQuery);
      onSetQueryParams(datasetQuery);

      setData({
        projectName: payload.projectName,
        startDate: payload.startDate,
        endDate: payload.endDate,
        sampleSize: payload.sampleSize,
      });
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

  useEffect(() => {
    if (!sendingQueries && success && queryResult) {
      if (isQueried.current) return;
      isQueried.current = true;
      const totalCount = queryResult.reduce(
        (accumulator, item) => accumulator + item.data.count,
        0
      );
      setCount(totalCount);
      setQueryResultPhase2(queryResult);
      setPhase(1);
    }
  }, [
    sendingQueries,
    success,
    queryResult,
    setPhase,
    setCount,
    setQueryResultPhase2,
  ]);

  return (
    <section>
      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader className="h-28 w-28" />
        </div>
      ) : (
        <div>
          <p className={"font-[600] text-black text-[1.1rem]"}>
            Project Details
          </p>

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
                {selectedColumns.map(
                  ({ column, entries, exclude, id }, index) => (
                    <RequiredColumnEntry
                      requiredColumn={column}
                      requiredEntry={entries}
                      excludedEntry={exclude}
                      onChange={updateEntries}
                      key={index}
                      id={id}
                    />
                  )
                )}
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
                <ButtonComponent loading={sendingQueries} type={"submit"}>
                  {sendingQueries ? "Loading..." : "Next"}
                </ButtonComponent>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
