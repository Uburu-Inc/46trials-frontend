/* READ THE CODE PROPERLY BEFORE MAKING EDITS TO THIS FILE */

import { dictionaryConverter } from "../../../constant";
import { sqlQueryBuilder } from "../sql-query-builder";
import { Props, Databases, DataBaseColumns } from "../../../type";

export const laboratoryQuery = ({ selection, action, entries }: Props) => {

  if (action === "count") {
    const countQuery = `${sqlQueryBuilder.SELECT_COUNT({
      all: "*",
    })}${sqlQueryBuilder.FROM({ table: Databases.LABORATORY })}${selection.find(({ id }) => id === "1")?.entries &&
        !selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.laboratory.diagnosis })
          // @ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })
        : ""
      }${!selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.laboratory.diagnosis })
          // @ts-ignore
          ?.NOT_LIKES({
            values:
              selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
          })
        : ""
      }${selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.laboratory.diagnosis })
          // @ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.laboratory.diagnosis })
            // @ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })}`
        : ""
      }${selection.find(({ id }) => id === "4")?.entries &&
        !selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.laboratory.age} ${selection.find(({ id }) => id === "4")?.entries ?? ""
        })`
        : ""
      }${!selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.laboratory.age} ${selection.find(({ id }) => id === "4")?.exclude ?? ""
        })`
        : ""
      }${selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.laboratory.age} ${selection.find(({ id }) => id === "4")?.entries
        }) AND (${dictionaryConverter.laboratory.age} ${selection.find(({ id }) => id === "4")?.exclude
        })`
        : ""
      }${selection.find(({ id }) => id === "22")?.entries &&
        !selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.laboratory.firstname,
              value: selection.find(({ id }) => id === "22")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "=",
            },
          ],
        })
        : ""
      }${!selection.find(({ id }) => id === "22")?.entries &&
        selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.laboratory.firstname,
              sqlKeyWord: "AND",
              operator: "<>",
              value: selection.find(({ id }) => id === "22")?.exclude ?? "",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "22")?.entries &&
        selection.find(({ id }) => id === "22")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.laboratory.firstname,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "22")?.entries ?? "",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.laboratory.firstname,
              operator: "<>",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "22")?.exclude ?? "",
            },
          ],
        })}`
        : ""
      }${selection.find(({ id }) => id === "23")?.entries &&
        !selection.find(({ id }) => id === "23")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.laboratory.lastname,
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
              key: dictionaryConverter.laboratory.lastname,
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
              key: dictionaryConverter.laboratory.lastname,
              value: selection.find(({ id }) => id === "23")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "=",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.laboratory.lastname,
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
                ? `${dictionaryConverter.laboratory.region} iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ""
                  : ""
                }`
                : ` OR ${dictionaryConverter.laboratory.region} iLIKE '%${val}%'`
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
                ? ` AND (${dictionaryConverter.laboratory.region
                } NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ")"
                  : ""
                }`
                : ` OR ${dictionaryConverter.laboratory.region} NOT iLIKE '%${val}%') `
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
                ? ` AND (${dictionaryConverter.laboratory.region
                } iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ")"
                  : ""
                }`
                : ` OR ${dictionaryConverter.laboratory.region} iLIKE '%${val}%') `
              }`
          )
          .join("")} ${selection
            .find(({ id }) => id === "14")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${index === 0
                  ? ` AND (${dictionaryConverter.laboratory.region
                  } NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.exclude?.split(",")
                    .length === 1
                    ? ")"
                    : ""
                  }`
                  : ` OR ${dictionaryConverter.laboratory.region} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
      }${selection.find(({ id }) => id === "28")?.entries &&
        !selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_name,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "28")?.entries &&
        selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "28")?.exclude?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_name,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "28")?.entries &&
        selection.find(({ id }) => id === "28")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_name,
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
              key: dictionaryConverter.laboratory.provider_name,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
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
              key: dictionaryConverter.laboratory.patient_contact,
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
            selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.patient_contact,
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
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.patient_contact,
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
              key: dictionaryConverter.laboratory.patient_contact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })}`
        : ""
      }${selection.find(({ id }) => id === "31")?.entries &&
        !selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "31")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_contact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "31")?.entries &&
        selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "31")?.exclude?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_contact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "31")?.entries &&
        selection.find(({ id }) => id === "31")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "31")?.entries?.split(",") ?? []
          ).map((providerContact, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_contact,
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
              key: dictionaryConverter.laboratory.provider_contact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerContact,
            };
          }),
        })}`
        : ""
      }${
        selection.find(({ id }) => id === "11")?.entries ||
        selection.find(({ id }) => id === "11")?.exclude
          ? "AND ("
          : ""
      }  ${
        selection.find(({ id }) => id === "11")?.entries &&
        !selection.find(({ id }) => id === "11")?.exclude
          ? selection
              .find(({ id }) => id === "11")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? `${dictionaryConverter.laboratory.test_request} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "11")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.test_request} iLIKE '%${val}%'`
                  }`
              )
              .join("")
          : ""
      } ${selection.find(({ id }) => id === "11")?.entries ||
      selection.find(({ id }) => id === "11")?.exclude ? ')':''}${
        !selection.find(({ id }) => id === "11")?.entries &&
        selection.find(({ id }) => id === "11")?.exclude
          ? selection
              .find(({ id }) => id === "11")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.laboratory.test_request
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "11")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.test_request} NOT iLIKE '%${val}%') `
                  }`
              )
              .join("")
          : ""
      }${
        selection.find(({ id }) => id === "11")?.entries &&
        selection.find(({ id }) => id === "11")?.exclude
          ? `${selection
              .find(({ id }) => id === "11")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.laboratory.test_request
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "11")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.test_request} iLIKE '%${val}%') `
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "11")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.laboratory.test_request
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "11")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.test_request} NOT iLIKE '%${val}%')`
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
                      ? `${dictionaryConverter.laboratory.gender} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.gender} iLIKE '%${val}%'`
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
                          dictionaryConverter.laboratory.gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.gender} NOT iLIKE '%${val}%') `
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
                          dictionaryConverter.laboratory.gender
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.gender} iLIKE '%${val}%') `
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
                          dictionaryConverter.laboratory.gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.gender} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }`;
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

    console.log(query);

    return query;
  }

  if (action === "dataset") {
    const datasetQuery = `${sqlQueryBuilder.SELECT({
      items: selection.map(
        ({ column }) =>
          dictionaryConverter.laboratory[column as keyof DataBaseColumns] ?? ""
      ),
    })}${sqlQueryBuilder.FROM({ table: Databases.LABORATORY })}${selection.find(({ id }) => id === "1")?.entries &&
        !selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.laboratory.diagnosis })
          // @ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })
        : ""
      }${!selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.laboratory.diagnosis })
          // @ts-ignore
          ?.NOT_LIKE({
            value: selection.find(({ id }) => id === "1")?.exclude ?? "",
          })
        : ""
      }${selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.laboratory.diagnosis })
          // @ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.laboratory.diagnosis })
            // @ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })}`
        : ""
      }${selection.find(({ id }) => id === "4")?.entries &&
        !selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.laboratory.age} ${selection.find(({ id }) => id === "4")?.entries ?? ""
        })`
        : ""
      }${!selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.laboratory.age} ${selection.find(({ id }) => id === "4")?.exclude ?? ""
        })`
        : ""
      }${selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.laboratory.age} ${selection.find(({ id }) => id === "4")?.entries
        }) AND (${dictionaryConverter.laboratory.age} ${selection.find(({ id }) => id === "4")?.exclude
        })`
        : ""
      }${sqlQueryBuilder.COMPARE({
        query: [
          {
            key: dictionaryConverter.laboratory.firstname,
            value: selection.find(({ id }) => id === "22")?.entries ?? "",
            sqlKeyWord: "AND",
            operator: "=",
          },
        ],
      })}${sqlQueryBuilder.COMPARE({
        query: [
          {
            key: dictionaryConverter.laboratory.lastname,
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
                ? `${dictionaryConverter.laboratory.region} iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ""
                  : ""
                }`
                : ` OR ${dictionaryConverter.laboratory.region} iLIKE '%${val}%'`
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
                ? ` AND (${dictionaryConverter.laboratory.region
                } NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ")"
                  : ""
                }`
                : ` OR ${dictionaryConverter.laboratory.region} NOT iLIKE '%${val}%') `
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
                ? ` AND (${dictionaryConverter.laboratory.region
                } iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.entries?.split(",")
                  .length === 1
                  ? ")"
                  : ""
                }`
                : ` OR ${dictionaryConverter.laboratory.region} iLIKE '%${val}%') `
              }`
          )
          .join("")} ${selection
            .find(({ id }) => id === "14")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${index === 0
                  ? ` AND (${dictionaryConverter.laboratory.region
                  } NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "14")?.exclude?.split(",")
                    .length === 1
                    ? ")"
                    : ""
                  }`
                  : ` OR ${dictionaryConverter.laboratory.region} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
      }${selection.find(({ id }) => id === "28")?.entries &&
        !selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_name,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "28")?.entries &&
        selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "28")?.exclude?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_name,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "28")?.entries &&
        selection.find(({ id }) => id === "28")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_name,
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
              key: dictionaryConverter.laboratory.provider_name,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
            };
          }),
        })}`
        : ""
      }${selection.find(({ id }) => id === "30")?.entries &&
        !selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.laboratory.patient_contact,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "30")?.entries ?? "",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "30")?.entries &&
        !selection.find(({ id }) => id === "30")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.patient_contact,
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
            selection.find(({ id }) => id === "30")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.patient_contact,
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
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.patient_contact,
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
              key: dictionaryConverter.laboratory.patient_contact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })}`
        : ""
      }${
        selection.find(({ id }) => id === "11")?.entries ||
        selection.find(({ id }) => id === "11")?.exclude
          ? "AND ("
          : ""
      }  ${
        selection.find(({ id }) => id === "11")?.entries &&
        !selection.find(({ id }) => id === "11")?.exclude
          ? selection
              .find(({ id }) => id === "11")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? `${dictionaryConverter.laboratory.test_request} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "11")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.test_request} iLIKE '%${val}%'`
                  }`
              )
              .join("")
          : ""
      } ${selection.find(({ id }) => id === "11")?.entries ||
      selection.find(({ id }) => id === "11")?.exclude ? ')':''}${
        !selection.find(({ id }) => id === "11")?.entries &&
        selection.find(({ id }) => id === "11")?.exclude
          ? selection
              .find(({ id }) => id === "11")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.laboratory.test_request
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "11")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.test_request} NOT iLIKE '%${val}%') `
                  }`
              )
              .join("")
          : ""
      }${
        selection.find(({ id }) => id === "11")?.entries &&
        selection.find(({ id }) => id === "11")?.exclude
          ? `${selection
              .find(({ id }) => id === "11")
              ?.entries?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.laboratory.test_request
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "11")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.test_request} iLIKE '%${val}%') `
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "11")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.laboratory.test_request
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "11")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.test_request} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${selection.find(({ id }) => id === "31")?.entries &&
        !selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "31")?.entries?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_contact,
              operator: "=",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${!selection.find(({ id }) => id === "31")?.entries &&
        selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "31")?.exclude?.split(",") ?? []
          ).map((patientContact, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_contact,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: patientContact,
            };
          }),
        })
        : ""
      }${selection.find(({ id }) => id === "31")?.entries &&
        selection.find(({ id }) => id === "31")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "31")?.entries?.split(",") ?? []
          ).map((providerContact, index) => {
            return {
              key: dictionaryConverter.laboratory.provider_contact,
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
              key: dictionaryConverter.laboratory.provider_contact,
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
                      ? `${dictionaryConverter.laboratory.gender} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.gender} iLIKE '%${val}%'`
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
                          dictionaryConverter.laboratory.gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.gender} NOT iLIKE '%${val}%') `
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
                          dictionaryConverter.laboratory.gender
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.gender} iLIKE '%${val}%') `
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
                          dictionaryConverter.laboratory.gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.laboratory.gender} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }`;
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

    console.log(query);
    return query;
  }
};
