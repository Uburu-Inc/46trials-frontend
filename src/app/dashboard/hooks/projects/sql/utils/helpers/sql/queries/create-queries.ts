/* READ THE CODE PROPERLY BEFORE MAKING EDITS TO THIS FILE */

import { sqlQueryBuilder } from "../sql-query-builder";
import { Props, DataBaseColumns } from "../../../type";

export function createQuery({ selection, action, entries, table, dictionaryConverter }: Props) {

  if (action === "count") {
    const countQuery = `${sqlQueryBuilder.SELECT_COUNT({
      all: "*",
    })}${sqlQueryBuilder.FROM({ table: table ?? "" })}${selection.find(({ id }) => id === "1")?.entries &&
        !selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.Diagnosis })
          // @ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })
        : ""
      }${!selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.Diagnosis })
          // @ts-ignore
          ?.NOT_LIKES({
            values:
              selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
          })
        : ""
      }${selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.Diagnosis })
          // @ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })}`
        : ""
      }${selection.find(({ id }) => id === "4")?.entries &&
        !selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${selection.find(({ id }) => id === "4")?.entries ?? ""
        })`
        : ""
      }${!selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${selection.find(({ id }) => id === "4")?.exclude ?? ""
        })`
        : ""
      }${selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${selection.find(({ id }) => id === "4")?.entries
        }) AND (${dictionaryConverter.Age} ${selection.find(({ id }) => id === "4")?.exclude
        })`
        : ""
      }${
        selection.find(({ id }) => id === "5")?.entries &&
        !selection.find(({ id }) => id === "5")?.exclude
          ? selection
              .find(({ id }) => id === "5")
              ?.entries?.split(",")
              .map(
                (val) =>
                  `${` AND (${
                    dictionaryConverter.ProcedureDescription
                  } iLIKE '%${val}%' ${
                    (selection.find(({ id }) => id === "5")?.entries?.split(",")
                      .length as number) > 1
                      ? `OR ${dictionaryConverter.ProcedureDescription} iLIKE '%${val}%'`
                      : ``
                  }) `}`
              )
              .join("")
          : ""
      }${
        !selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
          ? selection
              .find(({ id }) => id === "5")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.ProcedureDescription
                        } NOT LIKE '%${val}%'${
                          selection.find(({ id }) => id === "5")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.ProcedureDescription} NOT LIKE '%${val}%')`
                  }`
              )
              .join("")
          : ""
      }${
        selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
          ? `${selection
              .find(({ id }) => id === "5")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.ProcedureDescription
                        } LIKE '%${val}%'${
                          selection.find(({ id }) => id === "5")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.ProcedureDescription} LIKE '%${val}%')`
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "5")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.ProcedureDescription
                        } NOT LIKE '%${val}%'${
                          selection.find(({ id }) => id === "5")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.ProcedureDescription} NOT LIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${selection.find(({ id }) => id === "21")?.entries &&
        !selection.find(({ id }) => id === "21")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.FirstName,
              value: selection.find(({ id }) => id === "21")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "=",
            },
          ],
        })
        : ""
      }${!selection.find(({ id }) => id === "21")?.entries &&
        selection.find(({ id }) => id === "21")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.FirstName,
              sqlKeyWord: "AND",
              operator: "<>",
              value: selection.find(({ id }) => id === "21")?.exclude ?? "",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "21")?.entries &&
        selection.find(({ id }) => id === "21")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.FirstName,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "21")?.entries ?? "",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.FirstName,
              operator: "<>",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "21")?.exclude ?? "",
            },
          ],
        })}`
        : ""
      }${selection.find(({ id }) => id === "23")?.entries &&
        !selection.find(({ id }) => id === "23")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.LastName,
              value: selection.find(({ id }) => id === "23")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "=",
            },
          ],
        })
        : ""
      }${!selection.find(({ id }) => id === "23")?.entries &&
        selection.find(({ id }) => id === "23")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.LastName,
              value: selection.find(({ id }) => id === "23")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "<>",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "23")?.entries &&
        selection.find(({ id }) => id === "23")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.LastName,
              value: selection.find(({ id }) => id === "23")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "=",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.LastName,
              value: selection.find(({ id }) => id === "23")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "<>",
            },
          ],
        })}`
        : ""
      }${selection.find(({ id }) => id === "14")?.entries ||
        selection.find(({ id }) => id === "14")?.exclude
        ? "AND ("
        : ""
      }  ${selection.find(({ id }) => id === "14")?.entries &&
        !selection.find(({ id }) => id === "14")?.exclude
        ? selection
          .find(({ id }) => id === "14")
          ?.entries?.split(",")
          .map(
            (val, index) =>
              `${index === 0
                ? `${dictionaryConverter.Region} iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ""
                  : ""
                }`
                : ` OR ${dictionaryConverter.Region} iLIKE '%${val}%'`
              }`
          )
          .join("")
        : ""
      } ${selection.find(({ id }) => id === "14")?.entries ||
        selection.find(({ id }) => id === "14")?.exclude ? ')' : ''}${!selection.find(({ id }) => id === "14")?.entries &&
        selection.find(({ id }) => id === "14")?.exclude
        ? selection
          .find(({ id }) => id === "14")
          ?.exclude?.split(",")
          .map(
            (val, index) =>
              `${index === 0
                ? ` AND (${dictionaryConverter.Region
                } NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ")"
                  : ""
                }`
                : ` OR ${dictionaryConverter.Region} NOT iLIKE '%${val}%') `
              }`
          )
          .join("")
        : ""
      }${selection.find(({ id }) => id === "14")?.entries &&
        selection.find(({ id }) => id === "14")?.exclude
        ? `${selection
          .find(({ id }) => id === "14")
          ?.entries?.split(",")
          .map(
            (val, index) =>
              `${index === 0
                ? ` AND (${dictionaryConverter.Region
                } iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ")"
                  : ""
                }`
                : ` OR ${dictionaryConverter.Region} iLIKE '%${val}%') `
              }`
          )
          .join("")} ${selection
            .find(({ id }) => id === "14")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${index === 0
                  ? ` AND (${dictionaryConverter.Region
                  } NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.exclude?.split(",")
                    .length === 1
                    ? ")"
                    : ""
                  }`
                  : ` OR ${dictionaryConverter.Region} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
      }${selection.find(({ id }) => id === "27")?.entries &&
        !selection.find(({ id }) => id === "27")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "27")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.ProviderName,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "27")?.entries &&
        selection.find(({ id }) => id === "27")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "27")?.exclude?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.ProviderName,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "27")?.entries &&
        selection.find(({ id }) => id === "27")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "27")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.ProviderName,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })}${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "27")?.exclude?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.ProviderName,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })}`
        : ""
      }${selection.find(({ id }) => id === "29")?.entries &&
        !selection.find(({ id }) => id === "29")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "29")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.PatientContact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "29")?.entries &&
        selection.find(({ id }) => id === "29")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "29")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.PatientContact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "29")?.entries &&
        selection.find(({ id }) => id === "29")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "29")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.PatientContact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })}${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "29")?.exclude?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.PatientContact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })}`
        : ""
      }${selection.find(({ id }) => id === "30")?.entries &&
        !selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.ProviderContact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "30")?.entries &&
        selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.exclude?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.ProviderContact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "30")?.entries &&
        selection.find(({ id }) => id === "30")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
          ).map((providerContact, index) => {
            return {
              key: dictionaryConverter.ProviderContact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerContact,
            };
          }),
        })}${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.exclude?.split(",") ?? []
          ).map((providerContact, index) => {
            return {
              key: dictionaryConverter.ProviderContact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerContact,
            };
          }),
        })}`
        : ""
      }${
        selection.find(({ id }) => id === "10")?.entries ||
        selection.find(({ id }) => id === "10")?.exclude
          ? "AND ("
          : ""
      }  ${
        selection.find(({ id }) => id === "10")?.entries &&
        !selection.find(({ id }) => id === "10")?.exclude
          ? selection
              .find(({ id }) => id === "10")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? `${dictionaryConverter.TestRequest} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "10")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.TestRequest} iLIKE '%${val}%'`
                  }`
              )
              .join("")
          : ""
      } ${selection.find(({ id }) => id === "10")?.entries ||
      selection.find(({ id }) => id === "10")?.exclude ? ')':''}${
        !selection.find(({ id }) => id === "10")?.entries &&
        selection.find(({ id }) => id === "10")?.exclude
          ? selection
              .find(({ id }) => id === "10")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.TestRequest
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "10")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.TestRequest} NOT iLIKE '%${val}%') `
                  }`
              )
              .join("")
          : ""
      }${
        selection.find(({ id }) => id === "10")?.entries &&
        selection.find(({ id }) => id === "10")?.exclude
          ? `${selection
              .find(({ id }) => id === "10")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.TestRequest
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "10")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.TestRequest} iLIKE '%${val}%') `
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "10")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.TestRequest
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "10")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.TestRequest} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${
        selection.find(({ id }) => id === "3")?.entries ||
        selection.find(({ id }) => id === "3")?.exclude
          ? "AND ("
          : ""
      }  ${
        selection.find(({ id }) => id === "3")?.entries &&
        !selection.find(({ id }) => id === "3")?.exclude
          ? selection
              .find(({ id }) => id === "3")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? `${dictionaryConverter.Gender} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.Gender} iLIKE '%${val}%'`
                  }`
              )
              .join("")
          : ""
      } ${selection.find(({ id }) => id === "3")?.entries ||
      selection.find(({ id }) => id === "3")?.exclude ? ')':''}${
        !selection.find(({ id }) => id === "3")?.entries &&
        selection.find(({ id }) => id === "3")?.exclude
          ? selection
              .find(({ id }) => id === "3")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.Gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.Gender} NOT iLIKE '%${val}%') `
                  }`
              )
              .join("")
          : ""
      }${
        selection.find(({ id }) => id === "3")?.entries &&
        selection.find(({ id }) => id === "3")?.exclude
          ? `${selection
              .find(({ id }) => id === "3")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.Gender
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.Gender} iLIKE '%${val}%') `
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "3")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.Gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.Gender} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      } ${dictionaryConverter.date ? `AND ${dictionaryConverter.date} BETWEEN '${entries?.startDate}' AND '${entries?.endDate}'`:""}`;
    if (
      !selection.find(({ id }) => id === "1")?.entries &&
      !selection.find(({ id }) => id === "1")?.entries
    ) {
      return countQuery.replace(" AND ", "WHERE");
    }

    const query = countQuery
      .replace(/,\s*,/g, ",")
      .replace(/,\s*FROM/g, " FROM")
      .replace(/(\d+)([A-Za-z]+)/g, "$1 $2")
      .replace(/([A-Za-z]+)(\d+)/g, "$1 $2")
      .replace(/\)\s*AND\s*\(/g, ") AND (")
      .replace(/\s+AND\s+/g, " AND ")
      .replace(/\s+/g, " ")
      .trim();

    return query;
  }

  if (action === "dataset") {
    const datasetQuery = `${sqlQueryBuilder.SELECT({
      items: selection.map(
        ({ column }) =>
          dictionaryConverter[column as keyof DataBaseColumns] ?? ""
      ),
    })}${sqlQueryBuilder.FROM({ table: table ?? "" })}${selection.find(({ id }) => id === "1")?.entries &&
        !selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.Diagnosis })
          // @ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })
        : ""
      }${!selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.Diagnosis })
          // @ts-ignore
          ?.NOT_LIKE({
            value: selection.find(({ id }) => id === "1")?.exclude ?? "",
          })
        : ""
      }${selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.Diagnosis })
          // @ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })}`
        : ""
      }${selection.find(({ id }) => id === "4")?.entries &&
        !selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${selection.find(({ id }) => id === "4")?.entries ?? ""
        })`
        : ""
      }${!selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${selection.find(({ id }) => id === "4")?.exclude ?? ""
        })`
        : ""
      }${selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${selection.find(({ id }) => id === "4")?.entries
        }) AND (${dictionaryConverter.Age} ${selection.find(({ id }) => id === "4")?.exclude
        })`
        : ""
      }${
        selection.find(({ id }) => id === "5")?.entries &&
        !selection.find(({ id }) => id === "5")?.exclude
          ? selection
              .find(({ id }) => id === "5")
              ?.entries?.split(",")
              .map(
                (val) =>
                  `${` AND (${
                    dictionaryConverter.ProcedureDescription
                  } iLIKE '%${val}%' ${
                    (selection.find(({ id }) => id === "5")?.entries?.split(",")
                      .length as number) > 1
                      ? `OR ${dictionaryConverter.ProcedureDescription} iLIKE '%${val}%'`
                      : ``
                  }) `}`
              )
              .join("")
          : ""
      }${
        !selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
          ? selection
              .find(({ id }) => id === "5")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.ProcedureDescription
                        } NOT LIKE '%${val}%'${
                          selection.find(({ id }) => id === "5")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.ProcedureDescription} NOT LIKE '%${val}%')`
                  }`
              )
              .join("")
          : ""
      }${
        selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
          ? `${selection
              .find(({ id }) => id === "5")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.ProcedureDescription
                        } LIKE '%${val}%'${
                          selection.find(({ id }) => id === "5")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.ProcedureDescription} LIKE '%${val}%')`
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "5")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.ProcedureDescription
                        } NOT LIKE '%${val}%'${
                          selection.find(({ id }) => id === "5")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.ProcedureDescription} NOT LIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${selection.find(({ id }) => id === "21")?.entries &&
      !selection.find(({ id }) => id === "21")?.exclude
      ? sqlQueryBuilder.COMPARE({
        query: [
          {
            key: dictionaryConverter.FirstName,
            value: selection.find(({ id }) => id === "21")?.entries ?? "",
            sqlKeyWord: "AND",
            operator: "=",
          },
        ],
      })
      : ""
    }${!selection.find(({ id }) => id === "21")?.entries &&
      selection.find(({ id }) => id === "21")?.exclude
      ? sqlQueryBuilder.COMPARE({
        query: [
          {
            key: dictionaryConverter.FirstName,
            sqlKeyWord: "AND",
            operator: "<>",
            value: selection.find(({ id }) => id === "21")?.exclude ?? "",
          },
        ],
      })
      : ""
    }${selection.find(({ id }) => id === "21")?.entries &&
      selection.find(({ id }) => id === "21")?.exclude
      ? `${sqlQueryBuilder.COMPARE({
        query: [
          {
            key: dictionaryConverter.FirstName,
            operator: "=",
            sqlKeyWord: "AND",
            value: selection.find(({ id }) => id === "21")?.entries ?? "",
          },
        ],
      })}${sqlQueryBuilder.COMPARE({
        query: [
          {
            key: dictionaryConverter.FirstName,
            operator: "<>",
            sqlKeyWord: "AND",
            value: selection.find(({ id }) => id === "21")?.exclude ?? "",
          },
        ],
      })}`
      : ""
    }${sqlQueryBuilder.COMPARE({
        query: [
          {
            key: dictionaryConverter.LastName,
            value: selection.find(({ id }) => id === "23")?.entries ?? "",
            sqlKeyWord: "AND",
            operator: "=",
          },
        ],
      })} ${selection.find(({ id }) => id === "14")?.entries ||
        selection.find(({ id }) => id === "14")?.exclude
        ? "AND ("
        : ""
      }  ${selection.find(({ id }) => id === "14")?.entries &&
        !selection.find(({ id }) => id === "14")?.exclude
        ? selection
          .find(({ id }) => id === "14")
          ?.entries?.split(",")
          .map(
            (val, index) =>
              `${index === 0
                ? `${dictionaryConverter.Region} iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ""
                  : ""
                }`
                : ` OR ${dictionaryConverter.Region} iLIKE '%${val}%'`
              }`
          )
          .join("")
        : ""
      } ${selection.find(({ id }) => id === "14")?.entries ||
        selection.find(({ id }) => id === "14")?.exclude ? ')' : ''}${!selection.find(({ id }) => id === "14")?.entries &&
        selection.find(({ id }) => id === "14")?.exclude
        ? selection
          .find(({ id }) => id === "14")
          ?.exclude?.split(",")
          .map(
            (val, index) =>
              `${index === 0
                ? ` AND (${dictionaryConverter.Region
                } NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ")"
                  : ""
                }`
                : ` OR ${dictionaryConverter.Region} NOT iLIKE '%${val}%') `
              }`
          )
          .join("")
        : ""
      }${selection.find(({ id }) => id === "14")?.entries &&
        selection.find(({ id }) => id === "14")?.exclude
        ? `${selection
          .find(({ id }) => id === "14")
          ?.entries?.split(",")
          .map(
            (val, index) =>
              `${index === 0
                ? ` AND (${dictionaryConverter.Region
                } iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ")"
                  : ""
                }`
                : ` OR ${dictionaryConverter.Region} iLIKE '%${val}%') `
              }`
          )
          .join("")} ${selection
            .find(({ id }) => id === "14")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${index === 0
                  ? ` AND (${dictionaryConverter.Region
                  } NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.exclude?.split(",")
                    .length === 1
                    ? ")"
                    : ""
                  }`
                  : ` OR ${dictionaryConverter.Region} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
      }${selection.find(({ id }) => id === "27")?.entries &&
        !selection.find(({ id }) => id === "27")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "27")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.ProviderName,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "27")?.entries &&
        selection.find(({ id }) => id === "27")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "27")?.exclude?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.ProviderName,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "27")?.entries &&
        selection.find(({ id }) => id === "27")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "27")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.ProviderName,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })}${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "27")?.exclude?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.ProviderName,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })}`
        : ""
      }${selection.find(({ id }) => id === "29")?.entries &&
        !selection.find(({ id }) => id === "29")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.PatientContact,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "29")?.entries ?? "",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "29")?.entries &&
        !selection.find(({ id }) => id === "29")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "29")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.PatientContact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "29")?.entries &&
        selection.find(({ id }) => id === "29")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "29")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.PatientContact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "29")?.entries &&
        selection.find(({ id }) => id === "29")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "29")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.PatientContact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })}${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "29")?.exclude?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.PatientContact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })}`
        : ""
      }${
        selection.find(({ id }) => id === "10")?.entries ||
        selection.find(({ id }) => id === "10")?.exclude
          ? "AND ("
          : ""
      }  ${
        selection.find(({ id }) => id === "10")?.entries &&
        !selection.find(({ id }) => id === "10")?.exclude
          ? selection
              .find(({ id }) => id === "10")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? `${dictionaryConverter.TestRequest} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "10")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.TestRequest} iLIKE '%${val}%'`
                  }`
              )
              .join("")
          : ""
      } ${selection.find(({ id }) => id === "10")?.entries ||
      selection.find(({ id }) => id === "10")?.exclude ? ')':''}${
        !selection.find(({ id }) => id === "10")?.entries &&
        selection.find(({ id }) => id === "10")?.exclude
          ? selection
              .find(({ id }) => id === "10")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.TestRequest
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "10")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.TestRequest} NOT iLIKE '%${val}%') `
                  }`
              )
              .join("")
          : ""
      }${
        selection.find(({ id }) => id === "10")?.entries &&
        selection.find(({ id }) => id === "10")?.exclude
          ? `${selection
              .find(({ id }) => id === "10")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.TestRequest
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "10")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.TestRequest} iLIKE '%${val}%') `
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "10")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.TestRequest
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "10")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.TestRequest} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${selection.find(({ id }) => id === "30")?.entries &&
        !selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.ProviderContact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "30")?.entries &&
        selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.exclude?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.ProviderContact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "30")?.entries &&
        selection.find(({ id }) => id === "30")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
          ).map((providerContact, index) => {
            return {
              key: dictionaryConverter.ProviderContact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerContact,
            };
          }),
        })}${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.exclude?.split(",") ?? []
          ).map((providerContact, index) => {
            return {
              key: dictionaryConverter.ProviderContact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerContact,
            };
          }),
        })}`
        : ""
      }${
        selection.find(({ id }) => id === "3")?.entries ||
        selection.find(({ id }) => id === "3")?.exclude
          ? "AND ("
          : ""
      }  ${
        selection.find(({ id }) => id === "3")?.entries &&
        !selection.find(({ id }) => id === "3")?.exclude
          ? selection
              .find(({ id }) => id === "3")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? `${dictionaryConverter.Gender} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.Gender} iLIKE '%${val}%'`
                  }`
              )
              .join("")
          : ""
      } ${selection.find(({ id }) => id === "3")?.entries ||
      selection.find(({ id }) => id === "3")?.exclude ? ')':''}${
        !selection.find(({ id }) => id === "3")?.entries &&
        selection.find(({ id }) => id === "3")?.exclude
          ? selection
              .find(({ id }) => id === "3")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.Gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.Gender} NOT iLIKE '%${val}%') `
                  }`
              )
              .join("")
          : ""
      }${
        selection.find(({ id }) => id === "3")?.entries &&
        selection.find(({ id }) => id === "3")?.exclude
          ? `${selection
              .find(({ id }) => id === "3")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.Gender
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.Gender} iLIKE '%${val}%') `
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "3")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.Gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.Gender} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      } ${dictionaryConverter.date ? `AND ${dictionaryConverter.date} BETWEEN '${entries?.startDate}' AND '${entries?.endDate}'`:""} LIMIT ${entries?.sampleSize?.toLocaleString()}`;
    if (
      !selection.find(({ id }) => id === "1")?.entries &&
      !selection.find(({ id }) => id === "1")?.entries
    ) {
      return datasetQuery.replace(" AND ", "WHERE");
    }
    const query = datasetQuery
      .replace(/,\s*,/g, ",")
      .replace(/,\s*FROM/g, " FROM")
      .replace(/(\d+)([A-Za-z]+)/g, "$1 $2")
      .replace(/([A-Za-z]+)(\d+)/g, "$1 $2")
      .replace(/\)\s*AND\s*\(/g, ") AND (")
      .replace(/\s+AND\s+/g, " AND ")
      .replace(/\s+/g, " ")
      .trim();
      
    return query;
  }
};
