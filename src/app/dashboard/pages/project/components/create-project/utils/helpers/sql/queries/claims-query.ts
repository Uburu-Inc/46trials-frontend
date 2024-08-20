/* READ THE CODE PROPERLY BEFORE MAKING EDITS TO THIS FILE */

import { dictionaryConverter } from "../../../constant";
import { DataBaseColumns, Props } from "../../../type";
import { sqlQueryBuilder } from "../sql-query-builder";

const claimsDataBase =
  "(SELECT V.patient_id AS id, P.dob as dob, V.diagnosis_code as code, V.treatment_cost, D.diagnosis_description, D.item, PD.provider_contact, PD.provider_name, P.firstname, P.lastname, P.city, P.gender, P.state FROM visits V JOIN patients P ON V.patient_id = P.patient_id JOIN diagnosis D ON V.diagnosis_code=D.diagnosis_code JOIN providers PD ON V.provider_id=PD.provider_id) AS subquery";

const datasetAgeQuery = ` EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM dob) - CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE) < EXTRACT(MONTH FROM dob) OR (EXTRACT(MONTH FROM CURRENT_DATE) = EXTRACT(MONTH FROM dob) AND EXTRACT(DAY FROM CURRENT_DATE) < EXTRACT(DAY FROM dob)) THEN 1 ELSE 0 END AS Age `;

export const claimsQuery = ({ selection, action, entries }: Props) => {
  if (action === "count") {
    const countQuery = `${sqlQueryBuilder.SELECT_COUNT({
      all: "*",
    })}${sqlQueryBuilder.FROM({
      table: claimsDataBase,
    })}${selection.find(({ id }) => id === "4")?.entries
    //@ts-ignore
      ? sqlQueryBuilder.WHERE({ key: dictionaryConverter.claims.age })?.EXTRACT({
        value: `YEAR FROM AGE(CURRENT_DATE, ${dictionaryConverter.claims.age})`,
      })
      : ""
      } ${selection.find(({ id }) => id === "4")?.entries
        ? selection.find(({ id }) => id === "4")?.entries
        : ""
      }${selection.find(({ id }) => id === "4")?.entries && selection.find(({ id }) => id === "1")?.entries && !selection.find(({ id }) => id === "1")?.exclude ?
        selection
          .find(({ id }) => id === "1")
          ?.entries?.split(",")
          .map(
            (val, index) =>
              `${index === 0
                ? ` AND (${dictionaryConverter.claims.diagnosis} iLIKE '%${val}%'${selection.find(({ id }) => id === "1")?.entries?.split(',').length === 1 ? ')':''}`
                : ` OR ${dictionaryConverter.claims.diagnosis} iLIKE '%${val}%')`
              }`
          )
          .join("") : ""
      }${selection.find(({ id }) => id === "4")?.entries && !selection.find(({ id }) => id === "1")?.entries && selection.find(({ id }) => id === "1")?.exclude ? selection
        .find(({ id }) => id === "1")
        ?.exclude?.split(",")
        .map(
          (val, index) =>
            `${index === 0
              ? ` AND (${dictionaryConverter.claims.diagnosis} NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "1")?.exclude?.split(',').length === 1 ? ')':''}`
              : ` OR ${dictionaryConverter.claims.diagnosis} NOT iLIKE '%${val}%')`
            }`
        )
        .join("") : ""}${selection.find(({ id }) => id === "4")?.entries && selection.find(({ id }) => id === "1")?.entries && selection.find(({ id }) => id === "1")?.exclude ? `${selection
          .find(({ id }) => id === "1")
          ?.entries?.split(",")
          .map(
            (val, index) =>
              `${index === 0
                ? ` AND (${dictionaryConverter.claims.diagnosis} iLIKE '%${val}%'${selection.find(({ id }) => id === "1")?.entries?.split(',').length === 1 ? ')':''}`
                : ` OR ${dictionaryConverter.claims.diagnosis} iLIKE '%${val}%')`
              }`
          )
          .join("")} ${selection
            .find(({ id }) => id === "1")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${index === 0
                  ? ` AND (${dictionaryConverter.claims.diagnosis} NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "1")?.exclude?.split(',').length === 1 ? ')':''}`
                  : ` OR ${dictionaryConverter.claims.diagnosis} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}` : ''}${!selection.find(({ id }) => id === "4")?.entries &&
              selection.find(({ id }) => id === "1")?.entries &&
              !selection.find(({ id }) => id === "1")?.exclude
              ? sqlQueryBuilder
                .WHERE({ key: dictionaryConverter.claims.diagnosis })
                //@ts-ignore
                ?.LIKES({
                  values:
                    selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
                })
              : ""
      }${!selection.find(({ id }) => id === "4")?.entries &&
        !selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.claims.diagnosis })
          //@ts-ignore
          ?.NOT_LIKES({
            values:
              selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
          })
        : ""
      }${!selection.find(({ id }) => id === "4")?.entries &&
        selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.claims.diagnosis })
          //@ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.claims.diagnosis })
            //@ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })}`
        : ""
      }${selection.find(({ id }) => id === "22")?.entries &&
        !selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.firstname,
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
              key: dictionaryConverter.claims.firstname,
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
              key: dictionaryConverter.claims.firstname,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "22")?.entries ?? "",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.firstname,
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
              key: dictionaryConverter.claims.lastname,
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
              key: dictionaryConverter.claims.lastname,
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
              key: dictionaryConverter.claims.lastname,
              value: selection.find(({ id }) => id === "23")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "=",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.lastname,
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
                      ? `${dictionaryConverter.claims.region} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "14")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.region} iLIKE '%${val}%'`
                  }`
              )
              .join("")
          : ""
      } ${selection.find(({ id }) => id === "14")?.entries ||
      selection.find(({ id }) => id === "14")?.exclude ? ')':''}${
        !selection.find(({ id }) => id === "14")?.entries &&
        selection.find(({ id }) => id === "14")?.exclude
          ? selection
              .find(({ id }) => id === "14")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.claims.region
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "14")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.region} NOT iLIKE '%${val}%') `
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
                      ? ` AND (${
                          dictionaryConverter.claims.region
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "14")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.region} iLIKE '%${val}%') `
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "14")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.claims.region
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "14")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.region} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${selection.find(({ id }) => id === "31")?.entries &&
        !selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_contact,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "31")?.entries ?? "",
            },
          ],
        })
        : ""
      }${!selection.find(({ id }) => id === "31")?.entries &&
        selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_contact,
              operator: "<>",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "31")?.exclude ?? "",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "31")?.entries &&
        selection.find(({ id }) => id === "31")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_contact,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "31")?.entries ?? "",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_contact,
              operator: "<>",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "31")?.exclude ?? "",
            },
          ],
        })}`
        : ""
      }${selection.find(({ id }) => id === "28")?.entries &&
        !selection.find(({ id }) => id === "28")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: (
            selection.find(({ id }) => id === "28")?.entries?.split(",") ?? []
          ).map((providerName, index) => {
            return {
              key: dictionaryConverter.claims.provider_name,
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
              key: dictionaryConverter.claims.provider_name,
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
              key: dictionaryConverter.claims.provider_name,
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
              key: dictionaryConverter.claims.provider_name,
              operator: "<>",
              sqlKeyWord: `${index === 0 ? "AND" : "OR"}`,
              value: providerName,
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
                      ? `${dictionaryConverter.claims.gender} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.gender} iLIKE '%${val}%'`
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
                          dictionaryConverter.claims.gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.gender} NOT iLIKE '%${val}%') `
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
                          dictionaryConverter.claims.gender
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.gender} iLIKE '%${val}%') `
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
                          dictionaryConverter.claims.gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.gender} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${
        selection.find(({ id }) => id === "5")?.entries &&
      !selection.find(({ id }) => id === "5")?.exclude ? selection.find(({ id }) => id === "5")?.entries?.split(",").map((val) => `${` AND (${dictionaryConverter.claims.procedure_desc} iLIKE '%${val}%' ${selection.find(({ id }) => id === "5")?.entries?.split(",").length as number > 1 ? `OR ${dictionaryConverter.claims.procedure_desc} iLIKE '%${val}%'` : ``}) `}`
      ).join("") : ""
    
      }${!selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
        ? selection.find(({ id }) => id === "5")?.exclude?.split(",").map((val, index) =>
          `${index === 0
            ? ` AND (${dictionaryConverter.claims.procedure_desc} NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "5")?.exclude?.split(',').length === 1 ? ')':''}`
            : ` OR ${dictionaryConverter.claims.procedure_desc} NOT iLIKE '%${val}%') `
          }`
      )
      .join("")
        : ""
      }${selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
        ? `${selection.find(({ id }) => id === "5")?.entries?.split(",").map((val, index) =>
          `${index === 0
            ? ` AND (${dictionaryConverter.claims.procedure_desc} iLIKE '%${val}%'${selection.find(({ id }) => id === "5")?.entries?.split(',').length === 1 ? ')':''}`
            : ` OR ${dictionaryConverter.claims.procedure_desc} iLIKE '%${val}%') `
          }`
      )
      .join("")} ${selection.find(({ id }) => id === "5")?.exclude?.split(",").map((val, index) =>
        `${index === 0
          ? ` AND (${dictionaryConverter.claims.procedure_desc} NOT iLIKE '%${val}%'${selection.find(({ id }) => id === "5")?.exclude?.split(',').length === 1 ? ')':''}`
          : ` OR ${dictionaryConverter.claims.procedure_desc} NOT iLIKE '%${val}%') `
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

    console.log(query, 'count query');

    return query;
  }

  if (action === "dataset") {
    const datasetQuery = `${sqlQueryBuilder.SELECT({
      items: selection.map(
        ({ column }) =>
          dictionaryConverter.claims[column as keyof DataBaseColumns] ?? ""
      ),
    })}${selection.find(({ id }) => id === "4") ? `,${datasetAgeQuery}` : ""
      }${sqlQueryBuilder.FROM({ table: claimsDataBase })}${selection.find(({ id }) => id === "1")?.entries &&
        !selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.claims.diagnosis })
          //@ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })
        : ""
      }${!selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.claims.diagnosis })
          //@ts-ignore
          ?.NOT_LIKES({
            values:
              selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
          })
        : ""
      }${selection.find(({ id }) => id === "1")?.entries &&
        selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
          .WHERE({ key: dictionaryConverter.claims.diagnosis })
          //@ts-ignore
          ?.LIKES({
            values:
              selection.find(({ id }) => id === "1")?.entries?.split(",") ?? [],
          })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.claims.diagnosis })
            //@ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ?? [],
            })}`
        : ""
      }${selection.find(({ id }) => id === "22")?.entries &&
        !selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.firstname,
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
              key: dictionaryConverter.claims.firstname,
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
              key: dictionaryConverter.claims.firstname,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "22")?.entries ?? "",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.firstname,
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
              key: dictionaryConverter.claims.lastname,
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
              key: dictionaryConverter.claims.lastname,
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
              key: dictionaryConverter.claims.lastname,
              value: selection.find(({ id }) => id === "23")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "=",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.lastname,
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
                      ? `${dictionaryConverter.claims.region} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "14")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.region} iLIKE '%${val}%'`
                  }`
              )
              .join("")
          : ""
      } ${selection.find(({ id }) => id === "14")?.entries ||
      selection.find(({ id }) => id === "14")?.exclude ? ')':''}${
        !selection.find(({ id }) => id === "14")?.entries &&
        selection.find(({ id }) => id === "14")?.exclude
          ? selection
              .find(({ id }) => id === "14")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.claims.region
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "14")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.region} NOT iLIKE '%${val}%') `
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
                      ? ` AND (${
                          dictionaryConverter.claims.region
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "14")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.region} iLIKE '%${val}%') `
                  }`
              )
              .join("")} ${selection
              .find(({ id }) => id === "14")
              ?.exclude?.split(",")
              .map(
                (val, index) =>
                  `${
                    index === 0
                      ? ` AND (${
                          dictionaryConverter.claims.region
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "14")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.region} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${selection.find(({ id }) => id === "28")?.entries &&
        selection.find(({ id }) => id === "28")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_name,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "28")?.entries ?? "",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_name,
              operator: "<>",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "28")?.exclude ?? "",
            },
          ],
        })}`
        : ""
      }${selection.find(({ id }) => id === "31")?.entries &&
        !selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_contact,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "31")?.entries ?? "",
            },
          ],
        })
        : ""
      }${!selection.find(({ id }) => id === "31")?.entries &&
        selection.find(({ id }) => id === "31")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_contact,
              operator: "<>",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "31")?.exclude ?? "",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "31")?.entries &&
        selection.find(({ id }) => id === "31")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_contact,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "31")?.entries ?? "",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.provider_contact,
              operator: "<>",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "31")?.exclude ?? "",
            },
          ],
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
                      ? `${dictionaryConverter.claims.gender} iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ""
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.gender} iLIKE '%${val}%'`
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
                          dictionaryConverter.claims.gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.gender} NOT iLIKE '%${val}%') `
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
                          dictionaryConverter.claims.gender
                        } iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.entries?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.gender} iLIKE '%${val}%') `
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
                          dictionaryConverter.claims.gender
                        } NOT iLIKE '%${val}%'${
                          selection.find(({ id }) => id === "3")?.exclude?.split(",")
                            .length === 1
                            ? ")"
                            : ""
                        }`
                      : ` OR ${dictionaryConverter.claims.gender} NOT iLIKE '%${val}%')`
                  }`
              )
              .join("")}`
          : ""
      }${!selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.procedure_desc,
              sqlKeyWord: "AND",
              operator: "<>",
              value: selection.find(({ id }) => id === "5")?.exclude ?? "",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "5")?.entries &&
        !selection.find(({ id }) => id === "5")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.procedure_desc,
              value: selection.find(({ id }) => id === "5")?.entries ?? "",
              sqlKeyWord: "AND",
              operator: "=",
            },
          ],
        })
        : ""
      }${!selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
        ? sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.procedure_desc,
              sqlKeyWord: "AND",
              operator: "<>",
              value: selection.find(({ id }) => id === "5")?.exclude ?? "",
            },
          ],
        })
        : ""
      }${selection.find(({ id }) => id === "5")?.entries &&
        selection.find(({ id }) => id === "5")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.procedure_desc,
              operator: "=",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "5")?.entries ?? "",
            },
          ],
        })}${sqlQueryBuilder.COMPARE({
          query: [
            {
              key: dictionaryConverter.claims.procedure_desc,
              operator: "<>",
              sqlKeyWord: "AND",
              value: selection.find(({ id }) => id === "5")?.exclude ?? "",
            },
          ],
        })}`
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
