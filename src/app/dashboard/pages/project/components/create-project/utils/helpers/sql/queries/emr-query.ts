/* READ THE CODE PROPERLY BEFORE MAKING EDITS TO THIS FILE */

import { dictionaryConverter } from "../../../constant";
import { sqlQueryBuilder } from "../sql-query-builder";
import { Props, Databases, DataBaseColumns } from "../../../type";

export const emrQuery = ({ selection, action, entries }: Props) => {
  if (action === "count") {
    const countQuery = `${sqlQueryBuilder.SELECT_COUNT({
      all: "*",
    })}${sqlQueryBuilder.FROM({ table: Databases.EMR })}${
      selection.find(({ id }) => id === "1")?.entries &&
      !selection.find(({ id }) => id === "1")?.exclude
        ? //@ts-ignore
          sqlQueryBuilder.WHERE({ key: dictionaryConverter.emr.diagnosis })?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })
        : ""
    }${
      !selection.find(({ id }) => id === "1")?.entries &&
      selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.emr.diagnosis })
            //@ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })
        : ""
    }${
      selection.find(({ id }) => id === "1")?.entries &&
      selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.emr.diagnosis })
            //@ts-ignore
            ?.LIKES({
              values:
                selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
            })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.emr.diagnosis })
            //@ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })}`
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
                  dictionaryConverter.emr.procedure_desc
                } iLIKE '%${val}%' ${
                  (selection.find(({ id }) => id === "5")?.entries?.split(",")
                    .length as number) > 1
                    ? `OR ${dictionaryConverter.emr.procedure_desc} iLIKE '%${val}%'`
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
                        dictionaryConverter.emr.procedure_desc
                      } NOT LIKE '%${val}%'${
                        selection.find(({ id }) => id === "5")?.exclude?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.procedure_desc} NOT LIKE '%${val}%')`
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
                        dictionaryConverter.emr.procedure_desc
                      } LIKE '%${val}%'${
                        selection.find(({ id }) => id === "5")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.procedure_desc} LIKE '%${val}%')`
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
                        dictionaryConverter.emr.procedure_desc
                      } NOT LIKE '%${val}%'${
                        selection.find(({ id }) => id === "5")?.exclude?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.procedure_desc} NOT LIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${
      selection.find(({ id }) => id === "4")?.entries &&
      !selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.emr.age} ${
            selection.find(({ id }) => id === "4")?.entries ?? ""
          })`
        : ""
    }${
      !selection.find(({ id }) => id === "4")?.entries &&
      selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.emr.age} ${
            selection.find(({ id }) => id === "4")?.exclude ?? ""
          })`
        : ""
    }${
      selection.find(({ id }) => id === "4")?.entries &&
      selection.find(({ id }) => id === "4")?.exclude
        ? `AND (${dictionaryConverter.emr.age} ${
            selection.find(({ id }) => id === "4")?.entries
          }) AND (${dictionaryConverter.emr.age} ${
            selection.find(({ id }) => id === "4")?.exclude
          })`
        : ""
    }${
      selection.find(({ id }) => id === "22")?.entries &&
      !selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.firstname,
                value: selection.find(({ id }) => id === "22")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "=",
              },
            ],
          })
        : ""
    }${
      !selection.find(({ id }) => id === "22")?.entries &&
      selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.firstname,
                sqlKeyWord: "AND",
                operator: "<>",
                value: selection.find(({ id }) => id === "22")?.exclude ?? "",
              },
            ],
          })
        : ""
    }${
      selection.find(({ id }) => id === "22")?.entries &&
      selection.find(({ id }) => id === "22")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.firstname,
                operator: "=",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "22")?.entries ?? "",
              },
            ],
          })}${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.firstname,
                operator: "<>",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "22")?.exclude ?? "",
              },
            ],
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "23")?.entries &&
      !selection.find(({ id }) => id === "23")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.lastname,
                value: selection.find(({ id }) => id === "23")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "=",
              },
            ],
          })
        : ""
    }${
      !selection.find(({ id }) => id === "23")?.entries &&
      selection.find(({ id }) => id === "23")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.lastname,
                value: selection.find(({ id }) => id === "23")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "<>",
              },
            ],
          })
        : ""
    }${
      selection.find(({ id }) => id === "23")?.entries &&
      selection.find(({ id }) => id === "23")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.lastname,
                value: selection.find(({ id }) => id === "23")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "=",
              },
            ],
          })}${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.lastname,
                value: selection.find(({ id }) => id === "23")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "<>",
              },
            ],
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "14")?.entries ||
      selection.find(({ id }) => id === "14")?.exclude
        ? "AND ("
        : ""
    }  ${
      selection.find(({ id }) => id === "14")?.entries &&
      !selection.find(({ id }) => id === "14")?.exclude
        ? selection
            .find(({ id }) => id === "14")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.emr.region} iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "14")?.entries?.split(",")
                          .length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.region} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${
      selection.find(({ id }) => id === "14")?.entries ||
      selection.find(({ id }) => id === "14")?.exclude
        ? ")"
        : ""
    }${
      !selection.find(({ id }) => id === "14")?.entries &&
      selection.find(({ id }) => id === "14")?.exclude
        ? selection
            .find(({ id }) => id === "14")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.region} NOT iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "14")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.region} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${
      selection.find(({ id }) => id === "14")?.entries &&
      selection.find(({ id }) => id === "14")?.exclude
        ? `${selection
            .find(({ id }) => id === "14")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.region} iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "14")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.region} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "14")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.region} NOT iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "14")?.exclude?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.region} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${
      selection.find(({ id }) => id === "28")?.entries &&
      !selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.provider_name,
                operator: "=",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "28")?.entries ?? "",
              },
            ],
          })
        : ""
    }${
      selection.find(({ id }) => id === "28")?.entries &&
      !selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
            ).map((providerName, index) => {
              return {
                key: dictionaryConverter.emr.provider_name,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerName,
              };
            }),
          })
        : ""
    }${
      !selection.find(({ id }) => id === "28")?.entries &&
      selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "28")?.exclude?.split(",") ?? []
            ).map((providerName, index) => {
              return {
                key: dictionaryConverter.emr.provider_name,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerName,
              };
            }),
          })
        : ""
    }${
      selection.find(({ id }) => id === "28")?.entries &&
      selection.find(({ id }) => id === "28")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
            ).map((providerName, index) => {
              return {
                key: dictionaryConverter.emr.provider_name,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerName,
              };
            }),
          })}${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "28")?.exclude?.split(",") ?? []
            ).map((providerName, index) => {
              return {
                key: dictionaryConverter.emr.provider_name,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerName,
              };
            }),
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "30")?.entries &&
      !selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.patient_contact,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })
        : ""
    }${
      !selection.find(({ id }) => id === "30")?.entries &&
      selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.patient_contact,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })
        : ""
    }${
      selection.find(({ id }) => id === "30")?.entries &&
      selection.find(({ id }) => id === "30")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.patient_contact,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })}${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "30")?.exclude?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.patient_contact,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "31")?.entries &&
      !selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "31")?.entries?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.provider_contact,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })
        : ""
    }${
      !selection.find(({ id }) => id === "31")?.entries &&
      selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "31")?.exclude?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.provider_contact,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })
        : ""
    }${
      selection.find(({ id }) => id === "31")?.entries &&
      selection.find(({ id }) => id === "31")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "31")?.entries?.split(",") ?? []
            ).map((providerContact, index) => {
              return {
                key: dictionaryConverter.emr.provider_contact,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerContact,
              };
            }),
          })}${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "31")?.exclude?.split(",") ?? []
            ).map((providerContact, index) => {
              return {
                key: dictionaryConverter.emr.provider_contact,
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
                    ? `${dictionaryConverter.emr.gender} iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "3")?.entries?.split(",")
                          .length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.gender} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${
      selection.find(({ id }) => id === "3")?.entries ||
      selection.find(({ id }) => id === "3")?.exclude
        ? ")"
        : ""
    }${
      !selection.find(({ id }) => id === "3")?.entries &&
      selection.find(({ id }) => id === "3")?.exclude
        ? selection
            .find(({ id }) => id === "3")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.gender} NOT iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "3")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.gender} NOT iLIKE '%${val}%') `
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
                    ? ` AND (${dictionaryConverter.emr.gender} iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "3")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.gender} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "3")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.gender} NOT iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "3")?.exclude?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.gender} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }`;
    if (
      !selection.find(({ id }) => id === "1")?.entries &&
      !selection.find(({ id }) => id === "1")?.entries
    ) {
      return countQuery.replace("AND", "WHERE");
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

    console.log(query);

    return query;
  }

  if (action === "dataset") {
    const datasetQuery = `${sqlQueryBuilder.SELECT({
      items: selection.map(
        ({ column }) =>
          dictionaryConverter.emr[column as keyof DataBaseColumns] ?? ""
      ),
    })}${sqlQueryBuilder.FROM({ table: Databases.EMR })}${
      selection.find(({ id }) => id === "1")?.entries &&
      !selection.find(({ id }) => id === "1")?.exclude
        ? //@ts-ignore
          sqlQueryBuilder.WHERE({ key: dictionaryConverter.emr.diagnosis })?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })
        : ""
    }${
      !selection.find(({ id }) => id === "1")?.entries &&
      selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.emr.diagnosis })
            //@ts-ignore
            ?.NOT_LIKE({
              value: selection.find(({ id }) => id === "1")?.exclude ?? "",
            })
        : ""
    }${
      selection.find(({ id }) => id === "1")?.entries &&
      selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.emr.diagnosis })
            //@ts-ignore
            ?.LIKES({
              values:
                selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
            })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.emr.diagnosis })
            //@ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })}`
        : ""
    }${
      selection.find(({ id }) => id === "5")?.entries &&
      !selection.find(({ id }) => id === "5")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.procedure_desc,
                operator: "iLIKE",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "5")?.entries ?? "",
              },
            ],
          })
        : ""
    }${
      !selection.find(({ id }) => id === "5")?.entries &&
      selection.find(({ id }) => id === "5")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.procedure_desc,
                operator: "NOT iLIKE",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "5")?.exclude ?? "",
              },
            ],
          })
        : ""
    }${
      selection.find(({ id }) => id === "5")?.entries &&
      selection.find(({ id }) => id === "5")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.procedure_desc,
                operator: "iLIKE",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "5")?.entries ?? "",
              },
            ],
          })}${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.procedure_desc,
                operator: "NOT iLIKE",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "5")?.exclude ?? "",
              },
            ],
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "4")?.entries &&
      !selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.emr.age} ${
            selection.find(({ id }) => id === "4")?.entries ?? ""
          })`
        : ""
    }${
      !selection.find(({ id }) => id === "4")?.entries &&
      selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.emr.age} ${
            selection.find(({ id }) => id === "4")?.exclude ?? ""
          })`
        : ""
    }${
      selection.find(({ id }) => id === "4")?.entries &&
      selection.find(({ id }) => id === "4")?.exclude
        ? `AND (${dictionaryConverter.emr.age} ${
            selection.find(({ id }) => id === "4")?.entries
          }) AND (${dictionaryConverter.emr.age} ${
            selection.find(({ id }) => id === "4")?.exclude
          })`
        : ""
    }${
      selection.find(({ id }) => id === "22")?.entries &&
      !selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.firstname,
                value: selection.find(({ id }) => id === "22")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "=",
              },
            ],
          })
        : ""
    }${
      !selection.find(({ id }) => id === "22")?.entries &&
      selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.firstname,
                sqlKeyWord: "AND",
                operator: "<>",
                value: selection.find(({ id }) => id === "22")?.exclude ?? "",
              },
            ],
          })
        : ""
    }${
      selection.find(({ id }) => id === "22")?.entries &&
      selection.find(({ id }) => id === "22")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.firstname,
                operator: "=",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "22")?.entries ?? "",
              },
            ],
          })}${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.firstname,
                operator: "<>",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "22")?.exclude ?? "",
              },
            ],
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "23")?.entries &&
      !selection.find(({ id }) => id === "23")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.lastname,
                value: selection.find(({ id }) => id === "23")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "=",
              },
            ],
          })
        : ""
    }${
      !selection.find(({ id }) => id === "23")?.entries &&
      selection.find(({ id }) => id === "23")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.lastname,
                value: selection.find(({ id }) => id === "23")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "<>",
              },
            ],
          })
        : ""
    }${
      selection.find(({ id }) => id === "23")?.entries &&
      selection.find(({ id }) => id === "23")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.lastname,
                value: selection.find(({ id }) => id === "23")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "=",
              },
            ],
          })}${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.lastname,
                value: selection.find(({ id }) => id === "23")?.entries ?? "",
                sqlKeyWord: "AND",
                operator: "<>",
              },
            ],
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "14")?.entries ||
      selection.find(({ id }) => id === "14")?.exclude
        ? "AND ("
        : ""
    }  ${
      selection.find(({ id }) => id === "14")?.entries &&
      !selection.find(({ id }) => id === "14")?.exclude
        ? selection
            .find(({ id }) => id === "14")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.emr.region} iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "14")?.entries?.split(",")
                          .length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.region} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${
      selection.find(({ id }) => id === "14")?.entries ||
      selection.find(({ id }) => id === "14")?.exclude
        ? ")"
        : ""
    }${
      !selection.find(({ id }) => id === "14")?.entries &&
      selection.find(({ id }) => id === "14")?.exclude
        ? selection
            .find(({ id }) => id === "14")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.region} NOT iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "14")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.region} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${
      selection.find(({ id }) => id === "14")?.entries &&
      selection.find(({ id }) => id === "14")?.exclude
        ? `${selection
            .find(({ id }) => id === "14")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.region} iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "14")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.region} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "14")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.region} NOT iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "14")?.exclude?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.region} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${
      selection.find(({ id }) => id === "28")?.entries &&
      !selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.emr.provider_name,
                operator: "=",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "28")?.entries ?? "",
              },
            ],
          })
        : ""
    }${
      selection.find(({ id }) => id === "28")?.entries &&
      !selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
            ).map((providerName, index) => {
              return {
                key: dictionaryConverter.emr.provider_name,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerName,
              };
            }),
          })
        : ""
    }${
      !selection.find(({ id }) => id === "28")?.entries &&
      selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "28")?.exclude?.split(",") ?? []
            ).map((providerName, index) => {
              return {
                key: dictionaryConverter.emr.provider_name,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerName,
              };
            }),
          })
        : ""
    }${
      selection.find(({ id }) => id === "28")?.entries &&
      selection.find(({ id }) => id === "28")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
            ).map((providerName, index) => {
              return {
                key: dictionaryConverter.emr.provider_name,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerName,
              };
            }),
          })}${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "28")?.exclude?.split(",") ?? []
            ).map((providerName, index) => {
              return {
                key: dictionaryConverter.emr.provider_name,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerName,
              };
            }),
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "30")?.entries &&
      !selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.patient_contact,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })
        : ""
    }${
      !selection.find(({ id }) => id === "30")?.entries &&
      selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.patient_contact,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })
        : ""
    }${
      selection.find(({ id }) => id === "30")?.entries &&
      selection.find(({ id }) => id === "30")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.patient_contact,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })}${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "30")?.exclude?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.patient_contact,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })}`
        : ""
    }${
      selection.find(({ id }) => id === "31")?.entries &&
      !selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "31")?.entries?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.provider_contact,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })
        : ""
    }${
      !selection.find(({ id }) => id === "31")?.entries &&
      selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "31")?.exclude?.split(",") ?? []
            ).map((patientContact, index) => {
              return {
                key: dictionaryConverter.emr.provider_contact,
                operator: "<>",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: patientContact,
              };
            }),
          })
        : ""
    }${
      selection.find(({ id }) => id === "31")?.entries &&
      selection.find(({ id }) => id === "31")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "31")?.entries?.split(",") ?? []
            ).map((providerContact, index) => {
              return {
                key: dictionaryConverter.emr.provider_contact,
                operator: "=",
                sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
                value: providerContact,
              };
            }),
          })}${sqlQueryBuilder.COMPARE({
            query: (
              selection.find(({ id }) => id === "31")?.exclude?.split(",") ?? []
            ).map((providerContact, index) => {
              return {
                key: dictionaryConverter.emr.provider_contact,
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
                    ? `${dictionaryConverter.emr.gender} iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "3")?.entries?.split(",")
                          .length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.gender} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${
      selection.find(({ id }) => id === "3")?.entries ||
      selection.find(({ id }) => id === "3")?.exclude
        ? ")"
        : ""
    }${
      !selection.find(({ id }) => id === "3")?.entries &&
      selection.find(({ id }) => id === "3")?.exclude
        ? selection
            .find(({ id }) => id === "3")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.gender} NOT iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "3")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.gender} NOT iLIKE '%${val}%') `
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
                    ? ` AND (${dictionaryConverter.emr.gender} iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "3")?.entries?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.gender} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "3")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.emr.gender} NOT iLIKE '%${val}%'${
                        selection.find(({ id }) => id === "3")?.exclude?.split(",")
                          .length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.emr.gender} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }`;
    if (
      !selection.find(({ id }) => id === "1")?.entries &&
      !selection.find(({ id }) => id === "1")?.entries
    ) {
      return datasetQuery.replace("AND", "WHERE");
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

    console.log(query);
    return query;
  }
};
