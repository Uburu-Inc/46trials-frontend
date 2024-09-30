/* READ THE CODE PROPERLY BEFORE MAKING EDITS TO THIS FILE */

import { sqlQueryBuilder } from "../sql-query-builder";
import { Props, DataBaseColumns } from "../../../type";

export function createQuery({
  selection,
  action,
  entries,
  table,
  dictionaryConverter,
}: Props) {
  if (action === "count") {
    const countQuery = `${sqlQueryBuilder.SELECT_COUNT({
      all: "*",
    })}${sqlQueryBuilder.FROM({ table: table ?? "" })}${
      selection.find(({ id }) => id === "1")?.entries &&
      !selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.LIKES({
              values:
                selection.find(({ id }) => id === "1")?.entries?.split(",") ??
                [],
            })
        : ""
    }${
      !selection.find(({ id }) => id === "1")?.entries &&
      selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ??
                [],
            })
        : ""
    }${
      selection.find(({ id }) => id === "1")?.entries &&
      selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.LIKES({
              values:
                selection.find(({ id }) => id === "1")?.entries?.split(",") ??
                [],
            })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ??
                [],
            })}`
        : ""
    }${
      dictionaryConverter.Age && selection.find(({ id }) => id === "4")?.entries &&
      !selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${
            selection.find(({ id }) => id === "4")?.entries ?? ""
          })`
        : ""
    }${dictionaryConverter.Age && !selection.find(({ id }) => id === "4")?.entries &&
      selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${
            selection.find(({ id }) => id === "4")?.exclude ?? ""
          })`
        : ""
    }${dictionaryConverter.Age &&
      selection.find(({ id }) => id === "4")?.entries &&
      selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${
            selection.find(({ id }) => id === "4")?.entries
          }) AND (${dictionaryConverter.Age} ${
            selection.find(({ id }) => id === "4")?.exclude
          })`
        : ""
    }${dictionaryConverter.ProcedureDescription &&
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
    }${dictionaryConverter.ProcedureDescription &&
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
                        selection
                          .find(({ id }) => id === "5")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProcedureDescription} NOT LIKE '%${val}%')`
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.ProcedureDescription &&
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
                        selection
                          .find(({ id }) => id === "5")
                          ?.entries?.split(",").length === 1
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
                        selection
                          .find(({ id }) => id === "5")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProcedureDescription} NOT LIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }
    
    
    
    
    
    
    
    ${dictionaryConverter.FirstName &&
      selection.find(({ id }) => id === "21")?.entries &&
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
    }${dictionaryConverter.FirstName &&
      !selection.find(({ id }) => id === "21")?.entries &&
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
    }${dictionaryConverter.FirstName &&
      selection.find(({ id }) => id === "21")?.entries &&
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
    }
















     ${dictionaryConverter.MiddleName &&
       selection.find(({ id }) => id === "22")?.entries &&
       !selection.find(({ id }) => id === "22")?.exclude
         ? sqlQueryBuilder.COMPARE({
             query: [
               {
                 key: dictionaryConverter.MiddleName,
                 value: selection.find(({ id }) => id === "22")?.entries ?? "",
                 sqlKeyWord: "AND",
                 operator: "=",
               },
             ],
           })
         : ""
     }${dictionaryConverter.MiddleName &&
      !selection.find(({ id }) => id === "22")?.entries &&
      selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.MiddleName,
                sqlKeyWord: "AND",
                operator: "<>",
                value: selection.find(({ id }) => id === "22")?.exclude ?? "",
              },
            ],
          })
        : ""
    }${dictionaryConverter.MiddleName &&
      selection.find(({ id }) => id === "22")?.entries &&
      selection.find(({ id }) => id === "22")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.MiddleName,
                operator: "=",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "22")?.entries ?? "",
              },
            ],
          })}${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.MiddleName,
                operator: "<>",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "22")?.exclude ?? "",
              },
            ],
          })}`
        : ""
    }${dictionaryConverter.LastName &&
      selection.find(({ id }) => id === "23")?.entries &&
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
    }${dictionaryConverter.LastName &&
      !selection.find(({ id }) => id === "23")?.entries &&
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
    }${dictionaryConverter.LastName &&
      selection.find(({ id }) => id === "23")?.entries &&
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
    }${dictionaryConverter.Region &&
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
                    ? `${dictionaryConverter.Region} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "14")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Region} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Region &&
      selection.find(({ id }) => id === "14")?.entries ||
      selection.find(({ id }) => id === "14")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Region &&
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
                        dictionaryConverter.Region
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "14")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Region} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Region &&
      selection.find(({ id }) => id === "14")?.entries &&
      selection.find(({ id }) => id === "14")?.exclude
        ? `${selection
            .find(({ id }) => id === "14")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Region} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "14")
                          ?.entries?.split(",").length === 1
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
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Region
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "14")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Region} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.ProviderName &&
      selection.find(({ id }) => id === "27")?.entries &&
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
    }${dictionaryConverter.ProviderName &&
      !selection.find(({ id }) => id === "27")?.entries &&
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
    }${ dictionaryConverter.ProviderName &&
      selection.find(({ id }) => id === "27")?.entries &&
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
    }${dictionaryConverter.PatientContact &&
      selection.find(({ id }) => id === "29")?.entries &&
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
    }${dictionaryConverter.PatientContact &&
      !selection.find(({ id }) => id === "29")?.entries &&
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
    }${dictionaryConverter.PatientContact &&
      selection.find(({ id }) => id === "29")?.entries &&
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
    }${dictionaryConverter.ProviderContact &&
      selection.find(({ id }) => id === "30")?.entries &&
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
    }${dictionaryConverter.ProviderContact &&
      !selection.find(({ id }) => id === "30")?.entries &&
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
    }${dictionaryConverter.ProviderContact &&
      selection.find(({ id }) => id === "30")?.entries &&
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
    }${dictionaryConverter.TestRequest &&
      selection.find(({ id }) => id === "10")?.entries ||
      selection.find(({ id }) => id === "10")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.TestRequest &&
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
                        selection
                          .find(({ id }) => id === "10")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestRequest} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.TestRequest &&
      selection.find(({ id }) => id === "10")?.entries ||
      selection.find(({ id }) => id === "10")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.TestRequest &&
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
                        selection
                          .find(({ id }) => id === "10")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestRequest} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.TestRequest &&
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
                        selection
                          .find(({ id }) => id === "10")
                          ?.entries?.split(",").length === 1
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
                        selection
                          .find(({ id }) => id === "10")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestRequest} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Gender &&
      selection.find(({ id }) => id === "3")?.entries ||
      selection.find(({ id }) => id === "3")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Gender &&
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
                        selection
                          .find(({ id }) => id === "3")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Gender} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Gender &&
      selection.find(({ id }) => id === "3")?.entries ||
      selection.find(({ id }) => id === "3")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Gender &&
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
                        selection
                          .find(({ id }) => id === "3")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Gender} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Gender &&
      selection.find(({ id }) => id === "3")?.entries &&
      selection.find(({ id }) => id === "3")?.exclude
        ? `${selection
            .find(({ id }) => id === "3")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Gender} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "3")
                          ?.entries?.split(",").length === 1
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
                        selection
                          .find(({ id }) => id === "3")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Gender} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.DiagnosisCode && 
      selection.find(({ id }) => id === "2")?.entries ||
      selection.find(({ id }) => id === "2")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.DiagnosisCode &&
      selection.find(({ id }) => id === "2")?.entries &&
      !selection.find(({ id }) => id === "2")?.exclude
        ? selection
            .find(({ id }) => id === "2")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.DiagnosisCode} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "2")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DiagnosisCode} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.DiagnosisCode &&
      selection.find(({ id }) => id === "2")?.entries ||
      selection.find(({ id }) => id === "2")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.DiagnosisCode &&
      !selection.find(({ id }) => id === "2")?.entries &&
      selection.find(({ id }) => id === "2")?.exclude
        ? selection
            .find(({ id }) => id === "2")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DiagnosisCode
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "2")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DiagnosisCode} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.DiagnosisCode &&
      selection.find(({ id }) => id === "2")?.entries &&
      selection.find(({ id }) => id === "2")?.exclude
        ? `${selection
            .find(({ id }) => id === "2")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DiagnosisCode
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "2")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DiagnosisCode} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "2")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DiagnosisCode
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "2")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DiagnosisCode} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Cost &&
      selection.find(({ id }) => id === "7")?.entries ||
      selection.find(({ id }) => id === "7")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Cost &&
      selection.find(({ id }) => id === "7")?.entries &&
      !selection.find(({ id }) => id === "7")?.exclude
        ? selection
            .find(({ id }) => id === "7")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Cost} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "7")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Cost} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Cost &&
      selection.find(({ id }) => id === "7")?.entries ||
      selection.find(({ id }) => id === "7")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Cost &&
      !selection.find(({ id }) => id === "7")?.entries &&
      selection.find(({ id }) => id === "7")?.exclude
        ? selection
            .find(({ id }) => id === "7")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Cost} NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "7")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Cost} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Cost &&
      selection.find(({ id }) => id === "7")?.entries &&
      selection.find(({ id }) => id === "7")?.exclude
        ? `${selection
            .find(({ id }) => id === "7")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Cost} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "7")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Cost} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "7")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Cost} NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "7")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Cost} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.FacilityType &&
      selection.find(({ id }) => id === "8")?.entries ||
      selection.find(({ id }) => id === "8")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.FacilityType &&
      selection.find(({ id }) => id === "8")?.entries &&
      !selection.find(({ id }) => id === "8")?.exclude
        ? selection
            .find(({ id }) => id === "8")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.FacilityType} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "8")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityType} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.FacilityType &&
      selection.find(({ id }) => id === "8")?.entries ||
      selection.find(({ id }) => id === "8")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.FacilityType &&
      !selection.find(({ id }) => id === "8")?.entries &&
      selection.find(({ id }) => id === "8")?.exclude
        ? selection
            .find(({ id }) => id === "8")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityType
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "8")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityType} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.FacilityType &&
      selection.find(({ id }) => id === "8")?.entries &&
      selection.find(({ id }) => id === "8")?.exclude
        ? `${selection
            .find(({ id }) => id === "8")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityType
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "8")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityType} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "8")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityType
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "8")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityType} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.FacilityName &&
      selection.find(({ id }) => id === "9")?.entries ||
      selection.find(({ id }) => id === "9")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.FacilityName &&
      selection.find(({ id }) => id === "9")?.entries &&
      !selection.find(({ id }) => id === "9")?.exclude
        ? selection
            .find(({ id }) => id === "9")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.FacilityName} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "9")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityName} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.FacilityName &&
      selection.find(({ id }) => id === "9")?.entries ||
      selection.find(({ id }) => id === "9")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.FacilityName &&
      !selection.find(({ id }) => id === "9")?.entries &&
      selection.find(({ id }) => id === "9")?.exclude
        ? selection
            .find(({ id }) => id === "9")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityName
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "9")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityName} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.FacilityName &&
      selection.find(({ id }) => id === "9")?.entries &&
      selection.find(({ id }) => id === "9")?.exclude
        ? `${selection
            .find(({ id }) => id === "9")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityName
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "9")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityName} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "9")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityName
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "9")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityName} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.TestResult &&
      selection.find(({ id }) => id === "11")?.entries ||
      selection.find(({ id }) => id === "11")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.TestResult &&
      selection.find(({ id }) => id === "11")?.entries &&
      !selection.find(({ id }) => id === "11")?.exclude
        ? selection
            .find(({ id }) => id === "11")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.TestResult} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "11")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestResult} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.TestResult &&
      selection.find(({ id }) => id === "11")?.entries ||
      selection.find(({ id }) => id === "11")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.TestResult &&
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
                        dictionaryConverter.TestResult
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "11")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestResult} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.TestResult &&
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
                        dictionaryConverter.TestResult
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "11")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestResult} iLIKE '%${val}%') `
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
                        dictionaryConverter.TestResult
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "11")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestResult} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.DosageOfDrug &&
      selection.find(({ id }) => id === "12")?.entries ||
      selection.find(({ id }) => id === "12")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.DosageOfDrug &&
      selection.find(({ id }) => id === "12")?.entries &&
      !selection.find(({ id }) => id === "12")?.exclude
        ? selection
            .find(({ id }) => id === "12")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.DosageOfDrug} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "12")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageOfDrug} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.DosageOfDrug &&
      selection.find(({ id }) => id === "12")?.entries ||
      selection.find(({ id }) => id === "12")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.DosageOfDrug &&
      !selection.find(({ id }) => id === "12")?.entries &&
      selection.find(({ id }) => id === "12")?.exclude
        ? selection
            .find(({ id }) => id === "12")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageOfDrug
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "12")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageOfDrug} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.DosageOfDrug &&
      selection.find(({ id }) => id === "12")?.entries &&
      selection.find(({ id }) => id === "12")?.exclude
        ? `${selection
            .find(({ id }) => id === "12")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageOfDrug
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "12")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageOfDrug} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "12")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageOfDrug
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "12")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageOfDrug} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.DosageFrequency &&
      selection.find(({ id }) => id === "13")?.entries ||
      selection.find(({ id }) => id === "13")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.DosageFrequency &&
      selection.find(({ id }) => id === "13")?.entries &&
      !selection.find(({ id }) => id === "13")?.exclude
        ? selection
            .find(({ id }) => id === "13")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.DosageFrequency} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "13")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageFrequency} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.DosageFrequency &&
      selection.find(({ id }) => id === "13")?.entries ||
      selection.find(({ id }) => id === "13")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.DosageFrequency &&
      !selection.find(({ id }) => id === "13")?.entries &&
      selection.find(({ id }) => id === "13")?.exclude
        ? selection
            .find(({ id }) => id === "13")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageFrequency
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "13")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageFrequency} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.DosageFrequency &&
      selection.find(({ id }) => id === "13")?.entries &&
      selection.find(({ id }) => id === "13")?.exclude
        ? `${selection
            .find(({ id }) => id === "13")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageFrequency
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "13")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageFrequency} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "13")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageFrequency
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "13")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageFrequency} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Product &&
      selection.find(({ id }) => id === "15")?.entries ||
      selection.find(({ id }) => id === "15")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Product &&
      selection.find(({ id }) => id === "15")?.entries &&
      !selection.find(({ id }) => id === "15")?.exclude
        ? selection
            .find(({ id }) => id === "15")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Product} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "15")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Product} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Product &&
      selection.find(({ id }) => id === "15")?.entries ||
      selection.find(({ id }) => id === "15")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Product &&
      !selection.find(({ id }) => id === "15")?.entries &&
      selection.find(({ id }) => id === "15")?.exclude
        ? selection
            .find(({ id }) => id === "15")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Product
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "15")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Product} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Product &&
      selection.find(({ id }) => id === "15")?.entries &&
      selection.find(({ id }) => id === "15")?.exclude
        ? `${selection
            .find(({ id }) => id === "15")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Product} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "15")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Product} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "15")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Product
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "15")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Product} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Inpatient &&
      selection.find(({ id }) => id === "16")?.entries ||
      selection.find(({ id }) => id === "16")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Inpatient &&
      selection.find(({ id }) => id === "16")?.entries &&
      !selection.find(({ id }) => id === "16")?.exclude
        ? selection
            .find(({ id }) => id === "16")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Inpatient} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "16")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Inpatient} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Inpatient &&
      selection.find(({ id }) => id === "16")?.entries ||
      selection.find(({ id }) => id === "16")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Inpatient &&
      !selection.find(({ id }) => id === "16")?.entries &&
      selection.find(({ id }) => id === "16")?.exclude
        ? selection
            .find(({ id }) => id === "16")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Inpatient
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "16")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Inpatient} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Inpatient &&
      selection.find(({ id }) => id === "16")?.entries &&
      selection.find(({ id }) => id === "16")?.exclude
        ? `${selection
            .find(({ id }) => id === "16")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Inpatient} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "16")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Inpatient} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "16")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Inpatient
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "16")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Inpatient} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Outpatient &&
      selection.find(({ id }) => id === "17")?.entries ||
      selection.find(({ id }) => id === "17")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Outpatient &&
      selection.find(({ id }) => id === "17")?.entries &&
      !selection.find(({ id }) => id === "17")?.exclude
        ? selection
            .find(({ id }) => id === "17")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Outpatient} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "17")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Outpatient} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Outpatient &&
      selection.find(({ id }) => id === "17")?.entries ||
      selection.find(({ id }) => id === "17")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Outpatient &&
      !selection.find(({ id }) => id === "17")?.entries &&
      selection.find(({ id }) => id === "17")?.exclude
        ? selection
            .find(({ id }) => id === "17")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Outpatient
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "17")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Outpatient} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Outpatient &&
      selection.find(({ id }) => id === "17")?.entries &&
      selection.find(({ id }) => id === "17")?.exclude
        ? `${selection
            .find(({ id }) => id === "17")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Outpatient
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "17")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Outpatient} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "17")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Outpatient
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "17")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Outpatient} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.FacilityLocation &&
      selection.find(({ id }) => id === "18")?.entries ||
      selection.find(({ id }) => id === "18")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.FacilityLocation &&
      selection.find(({ id }) => id === "18")?.entries &&
      !selection.find(({ id }) => id === "18")?.exclude
        ? selection
            .find(({ id }) => id === "18")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${
                        dictionaryConverter.FacilityLocation
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "18")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityLocation} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.FacilityLocation &&
      selection.find(({ id }) => id === "18")?.entries ||
      selection.find(({ id }) => id === "18")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.FacilityLocation &&
      !selection.find(({ id }) => id === "18")?.entries &&
      selection.find(({ id }) => id === "18")?.exclude
        ? selection
            .find(({ id }) => id === "18")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityLocation
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "18")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityLocation} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.FacilityLocation &&
      selection.find(({ id }) => id === "18")?.entries &&
      selection.find(({ id }) => id === "18")?.exclude
        ? `${selection
            .find(({ id }) => id === "18")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityLocation
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "18")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityLocation} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "18")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityLocation
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "18")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityLocation} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }
${dictionaryConverter.PatientID &&
  selection.find(({ id }) => id === "19")?.entries ||
  selection.find(({ id }) => id === "19")?.exclude
    ? "AND ("
    : ""
}${dictionaryConverter.PatientID &&
      selection.find(({ id }) => id === "19")?.entries &&
      !selection.find(({ id }) => id === "19")?.exclude
        ? selection
            .find(({ id }) => id === "19")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.PatientID} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "19")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.PatientID} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.PatientID &&
      selection.find(({ id }) => id === "19")?.entries ||
      selection.find(({ id }) => id === "19")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.PatientID &&
      !selection.find(({ id }) => id === "19")?.entries &&
      selection.find(({ id }) => id === "19")?.exclude
        ? selection
            .find(({ id }) => id === "19")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.PatientID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "19")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.PatientID} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.PatientID &&
      selection.find(({ id }) => id === "19")?.entries &&
      selection.find(({ id }) => id === "19")?.exclude
        ? `${selection
            .find(({ id }) => id === "19")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.PatientID} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "19")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.PatientID} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "19")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.PatientID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "19")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.PatientID} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.SpecimenType &&
      selection.find(({ id }) => id === "20")?.entries ||
      selection.find(({ id }) => id === "20")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.SpecimenType &&
      selection.find(({ id }) => id === "20")?.entries &&
      !selection.find(({ id }) => id === "20")?.exclude
        ? selection
            .find(({ id }) => id === "20")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.SpecimenType} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "20")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SpecimenType} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.SpecimenType &&
      selection.find(({ id }) => id === "20")?.entries ||
      selection.find(({ id }) => id === "20")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.SpecimenType &&
      !selection.find(({ id }) => id === "20")?.entries &&
      selection.find(({ id }) => id === "20")?.exclude
        ? selection
            .find(({ id }) => id === "20")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SpecimenType
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "20")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SpecimenType} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.SpecimenType &&
      selection.find(({ id }) => id === "20")?.entries &&
      selection.find(({ id }) => id === "20")?.exclude
        ? `${selection
            .find(({ id }) => id === "20")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SpecimenType
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "20")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SpecimenType} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "20")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SpecimenType
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "20")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SpecimenType} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.DateOfBirth &&
      selection.find(({ id }) => id === "24")?.entries ||
      selection.find(({ id }) => id === "24")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.DateOfBirth &&
      selection.find(({ id }) => id === "24")?.entries &&
      !selection.find(({ id }) => id === "24")?.exclude
        ? selection
            .find(({ id }) => id === "24")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.DateOfBirth} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "24")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DateOfBirth} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.DateOfBirth &&
      selection.find(({ id }) => id === "24")?.entries ||
      selection.find(({ id }) => id === "24")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.DateOfBirth &&
      !selection.find(({ id }) => id === "24")?.entries &&
      selection.find(({ id }) => id === "24")?.exclude
        ? selection
            .find(({ id }) => id === "24")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DateOfBirth
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "24")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DateOfBirth} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.DateOfBirth &&
      selection.find(({ id }) => id === "24")?.entries &&
      selection.find(({ id }) => id === "24")?.exclude
        ? `${selection
            .find(({ id }) => id === "24")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DateOfBirth
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "24")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DateOfBirth} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "24")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DateOfBirth
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "24")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DateOfBirth} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }
${dictionaryConverter.SateOfOrigin &&
  selection.find(({ id }) => id === "25")?.entries ||
  selection.find(({ id }) => id === "25")?.exclude
    ? "AND ("
    : ""
}  ${dictionaryConverter.SateOfOrigin &&
      selection.find(({ id }) => id === "25")?.entries &&
      !selection.find(({ id }) => id === "25")?.exclude
        ? selection
            .find(({ id }) => id === "25")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.SateOfOrigin} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "25")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SateOfOrigin} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.SateOfOrigin &&
      selection.find(({ id }) => id === "25")?.entries ||
      selection.find(({ id }) => id === "25")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.SateOfOrigin &&
      !selection.find(({ id }) => id === "25")?.entries &&
      selection.find(({ id }) => id === "25")?.exclude
        ? selection
            .find(({ id }) => id === "25")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SateOfOrigin
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "25")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SateOfOrigin} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.SateOfOrigin &&
      selection.find(({ id }) => id === "25")?.entries &&
      selection.find(({ id }) => id === "25")?.exclude
        ? `${selection
            .find(({ id }) => id === "25")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SateOfOrigin
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "25")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SateOfOrigin} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "25")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SateOfOrigin
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "25")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SateOfOrigin} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries ||
      selection.find(({ id }) => id === "26")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries &&
      !selection.find(({ id }) => id === "26")?.exclude
        ? selection
            .find(({ id }) => id === "26")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.ProviderID} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries ||
      selection.find(({ id }) => id === "26")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.ProviderID &&
      !selection.find(({ id }) => id === "26")?.entries &&
      selection.find(({ id }) => id === "26")?.exclude
        ? selection
            .find(({ id }) => id === "26")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries &&
      selection.find(({ id }) => id === "26")?.exclude
        ? `${selection
            .find(({ id }) => id === "26")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "26")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries ||
      selection.find(({ id }) => id === "26")?.exclude
        ? "AND ("
        : ""
    }  ${
      selection.find(({ id }) => id === "26")?.entries &&
      !selection.find(({ id }) => id === "26")?.exclude
        ? selection
            .find(({ id }) => id === "26")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.ProviderID} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries ||
      selection.find(({ id }) => id === "26")?.exclude
        ? ")"
        : ""
    }${
      !selection.find(({ id }) => id === "26")?.entries &&
      selection.find(({ id }) => id === "26")?.exclude
        ? selection
            .find(({ id }) => id === "26")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries &&
      selection.find(({ id }) => id === "26")?.exclude
        ? `${selection
            .find(({ id }) => id === "26")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "26")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Specialty &&
      selection.find(({ id }) => id === "28")?.entries ||
      selection.find(({ id }) => id === "28")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Specialty &&
      selection.find(({ id }) => id === "28")?.entries &&
      !selection.find(({ id }) => id === "28")?.exclude
        ? selection
            .find(({ id }) => id === "28")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Specialty} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "28")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Specialty} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Specialty &&
      selection.find(({ id }) => id === "28")?.entries ||
      selection.find(({ id }) => id === "28")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Specialty &&
      !selection.find(({ id }) => id === "28")?.entries &&
      selection.find(({ id }) => id === "28")?.exclude
        ? selection
            .find(({ id }) => id === "28")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Specialty
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "28")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Specialty} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Specialty &&
      selection.find(({ id }) => id === "28")?.entries &&
      selection.find(({ id }) => id === "28")?.exclude
        ? `${selection
            .find(({ id }) => id === "28")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Specialty} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "28")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Specialty} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "28")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Specialty
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "28")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Specialty} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${
      dictionaryConverter.date
        ? `AND ${dictionaryConverter.date} BETWEEN '${entries?.startDate}' AND '${entries?.endDate}'`
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

    return query;
  }

  if (action === "dataset") {
    const datasetQuery = `${sqlQueryBuilder.SELECT({
      items: selection.map(
        ({ column }) =>
          dictionaryConverter[column as keyof DataBaseColumns] ?? ""
      ),
    })}${sqlQueryBuilder.FROM({ table: table ?? "" })}${
      selection.find(({ id }) => id === "1")?.entries &&
      !selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.LIKES({
              values:
                selection.find(({ id }) => id === "1")?.entries?.split(",") ??
                [],
            })
        : ""
    }${
      !selection.find(({ id }) => id === "1")?.entries &&
      selection.find(({ id }) => id === "1")?.exclude
        ? sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.NOT_LIKE({
              value: selection.find(({ id }) => id === "1")?.exclude ?? "",
            })
        : ""
    }${
      selection.find(({ id }) => id === "1")?.entries &&
      selection.find(({ id }) => id === "1")?.exclude
        ? `${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.LIKES({
              values:
                selection.find(({ id }) => id === "1")?.entries?.split(",") ??
                [],
            })}${sqlQueryBuilder
            .WHERE({ key: dictionaryConverter.Diagnosis })
            // @ts-ignore
            ?.NOT_LIKES({
              values:
                selection.find(({ id }) => id === "1")?.exclude?.split(",") ??
                [],
            })}`
        : ""
    }${
      dictionaryConverter.Age && selection.find(({ id }) => id === "4")?.entries &&
      !selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${
            selection.find(({ id }) => id === "4")?.entries ?? ""
          })`
        : ""
    }${dictionaryConverter.Age && !selection.find(({ id }) => id === "4")?.entries &&
      selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${
            selection.find(({ id }) => id === "4")?.exclude ?? ""
          })`
        : ""
    }${dictionaryConverter.Age &&
      selection.find(({ id }) => id === "4")?.entries &&
      selection.find(({ id }) => id === "4")?.exclude
        ? ` AND (${dictionaryConverter.Age} ${
            selection.find(({ id }) => id === "4")?.entries
          }) AND (${dictionaryConverter.Age} ${
            selection.find(({ id }) => id === "4")?.exclude
          })`
        : ""
    }${dictionaryConverter.ProcedureDescription &&
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
    }${dictionaryConverter.ProcedureDescription &&
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
                        selection
                          .find(({ id }) => id === "5")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProcedureDescription} NOT LIKE '%${val}%')`
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.ProcedureDescription &&
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
                        selection
                          .find(({ id }) => id === "5")
                          ?.entries?.split(",").length === 1
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
                        selection
                          .find(({ id }) => id === "5")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProcedureDescription} NOT LIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }
    
    
    
    
    
    
    
    ${dictionaryConverter.FirstName &&
      selection.find(({ id }) => id === "21")?.entries &&
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
    }${dictionaryConverter.FirstName &&
      !selection.find(({ id }) => id === "21")?.entries &&
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
    }${dictionaryConverter.FirstName &&
      selection.find(({ id }) => id === "21")?.entries &&
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
    }
















     ${dictionaryConverter.MiddleName &&
       selection.find(({ id }) => id === "22")?.entries &&
       !selection.find(({ id }) => id === "22")?.exclude
         ? sqlQueryBuilder.COMPARE({
             query: [
               {
                 key: dictionaryConverter.MiddleName,
                 value: selection.find(({ id }) => id === "22")?.entries ?? "",
                 sqlKeyWord: "AND",
                 operator: "=",
               },
             ],
           })
         : ""
     }${dictionaryConverter.MiddleName &&
      !selection.find(({ id }) => id === "22")?.entries &&
      selection.find(({ id }) => id === "22")?.exclude
        ? sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.MiddleName,
                sqlKeyWord: "AND",
                operator: "<>",
                value: selection.find(({ id }) => id === "22")?.exclude ?? "",
              },
            ],
          })
        : ""
    }${dictionaryConverter.MiddleName &&
      selection.find(({ id }) => id === "22")?.entries &&
      selection.find(({ id }) => id === "22")?.exclude
        ? `${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.MiddleName,
                operator: "=",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "22")?.entries ?? "",
              },
            ],
          })}${sqlQueryBuilder.COMPARE({
            query: [
              {
                key: dictionaryConverter.MiddleName,
                operator: "<>",
                sqlKeyWord: "AND",
                value: selection.find(({ id }) => id === "22")?.exclude ?? "",
              },
            ],
          })}`
        : ""
    }${dictionaryConverter.LastName &&
      selection.find(({ id }) => id === "23")?.entries &&
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
    }${dictionaryConverter.LastName &&
      !selection.find(({ id }) => id === "23")?.entries &&
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
    }${dictionaryConverter.LastName &&
      selection.find(({ id }) => id === "23")?.entries &&
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
    }${dictionaryConverter.Region &&
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
                    ? `${dictionaryConverter.Region} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "14")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Region} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Region &&
      selection.find(({ id }) => id === "14")?.entries ||
      selection.find(({ id }) => id === "14")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Region &&
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
                        dictionaryConverter.Region
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "14")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Region} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Region &&
      selection.find(({ id }) => id === "14")?.entries &&
      selection.find(({ id }) => id === "14")?.exclude
        ? `${selection
            .find(({ id }) => id === "14")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Region} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "14")
                          ?.entries?.split(",").length === 1
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
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Region
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "14")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Region} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.ProviderName &&
      selection.find(({ id }) => id === "27")?.entries &&
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
    }${dictionaryConverter.ProviderName &&
      !selection.find(({ id }) => id === "27")?.entries &&
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
    }${ dictionaryConverter.ProviderName &&
      selection.find(({ id }) => id === "27")?.entries &&
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
    }${dictionaryConverter.PatientContact &&
      selection.find(({ id }) => id === "29")?.entries &&
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
    }${dictionaryConverter.PatientContact &&
      !selection.find(({ id }) => id === "29")?.entries &&
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
    }${dictionaryConverter.PatientContact &&
      selection.find(({ id }) => id === "29")?.entries &&
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
    }${dictionaryConverter.ProviderContact &&
      selection.find(({ id }) => id === "30")?.entries &&
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
    }${dictionaryConverter.ProviderContact &&
      !selection.find(({ id }) => id === "30")?.entries &&
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
    }${dictionaryConverter.ProviderContact &&
      selection.find(({ id }) => id === "30")?.entries &&
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
    }${dictionaryConverter.TestRequest &&
      selection.find(({ id }) => id === "10")?.entries ||
      selection.find(({ id }) => id === "10")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.TestRequest &&
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
                        selection
                          .find(({ id }) => id === "10")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestRequest} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.TestRequest &&
      selection.find(({ id }) => id === "10")?.entries ||
      selection.find(({ id }) => id === "10")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.TestRequest &&
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
                        selection
                          .find(({ id }) => id === "10")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestRequest} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.TestRequest &&
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
                        selection
                          .find(({ id }) => id === "10")
                          ?.entries?.split(",").length === 1
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
                        selection
                          .find(({ id }) => id === "10")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestRequest} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Gender &&
      selection.find(({ id }) => id === "3")?.entries ||
      selection.find(({ id }) => id === "3")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Gender &&
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
                        selection
                          .find(({ id }) => id === "3")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Gender} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Gender &&
      selection.find(({ id }) => id === "3")?.entries ||
      selection.find(({ id }) => id === "3")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Gender &&
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
                        selection
                          .find(({ id }) => id === "3")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Gender} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Gender &&
      selection.find(({ id }) => id === "3")?.entries &&
      selection.find(({ id }) => id === "3")?.exclude
        ? `${selection
            .find(({ id }) => id === "3")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Gender} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "3")
                          ?.entries?.split(",").length === 1
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
                        selection
                          .find(({ id }) => id === "3")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Gender} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.DiagnosisCode && 
      selection.find(({ id }) => id === "2")?.entries ||
      selection.find(({ id }) => id === "2")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.DiagnosisCode &&
      selection.find(({ id }) => id === "2")?.entries &&
      !selection.find(({ id }) => id === "2")?.exclude
        ? selection
            .find(({ id }) => id === "2")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.DiagnosisCode} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "2")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DiagnosisCode} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.DiagnosisCode &&
      selection.find(({ id }) => id === "2")?.entries ||
      selection.find(({ id }) => id === "2")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.DiagnosisCode &&
      !selection.find(({ id }) => id === "2")?.entries &&
      selection.find(({ id }) => id === "2")?.exclude
        ? selection
            .find(({ id }) => id === "2")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DiagnosisCode
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "2")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DiagnosisCode} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.DiagnosisCode &&
      selection.find(({ id }) => id === "2")?.entries &&
      selection.find(({ id }) => id === "2")?.exclude
        ? `${selection
            .find(({ id }) => id === "2")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DiagnosisCode
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "2")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DiagnosisCode} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "2")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DiagnosisCode
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "2")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DiagnosisCode} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Cost &&
      selection.find(({ id }) => id === "7")?.entries ||
      selection.find(({ id }) => id === "7")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Cost &&
      selection.find(({ id }) => id === "7")?.entries &&
      !selection.find(({ id }) => id === "7")?.exclude
        ? selection
            .find(({ id }) => id === "7")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Cost} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "7")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Cost} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Cost &&
      selection.find(({ id }) => id === "7")?.entries ||
      selection.find(({ id }) => id === "7")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Cost &&
      !selection.find(({ id }) => id === "7")?.entries &&
      selection.find(({ id }) => id === "7")?.exclude
        ? selection
            .find(({ id }) => id === "7")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Cost} NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "7")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Cost} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Cost &&
      selection.find(({ id }) => id === "7")?.entries &&
      selection.find(({ id }) => id === "7")?.exclude
        ? `${selection
            .find(({ id }) => id === "7")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Cost} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "7")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Cost} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "7")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Cost} NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "7")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Cost} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.FacilityType &&
      selection.find(({ id }) => id === "8")?.entries ||
      selection.find(({ id }) => id === "8")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.FacilityType &&
      selection.find(({ id }) => id === "8")?.entries &&
      !selection.find(({ id }) => id === "8")?.exclude
        ? selection
            .find(({ id }) => id === "8")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.FacilityType} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "8")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityType} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.FacilityType &&
      selection.find(({ id }) => id === "8")?.entries ||
      selection.find(({ id }) => id === "8")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.FacilityType &&
      !selection.find(({ id }) => id === "8")?.entries &&
      selection.find(({ id }) => id === "8")?.exclude
        ? selection
            .find(({ id }) => id === "8")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityType
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "8")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityType} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.FacilityType &&
      selection.find(({ id }) => id === "8")?.entries &&
      selection.find(({ id }) => id === "8")?.exclude
        ? `${selection
            .find(({ id }) => id === "8")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityType
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "8")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityType} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "8")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityType
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "8")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityType} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.FacilityName &&
      selection.find(({ id }) => id === "9")?.entries ||
      selection.find(({ id }) => id === "9")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.FacilityName &&
      selection.find(({ id }) => id === "9")?.entries &&
      !selection.find(({ id }) => id === "9")?.exclude
        ? selection
            .find(({ id }) => id === "9")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.FacilityName} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "9")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityName} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.FacilityName &&
      selection.find(({ id }) => id === "9")?.entries ||
      selection.find(({ id }) => id === "9")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.FacilityName &&
      !selection.find(({ id }) => id === "9")?.entries &&
      selection.find(({ id }) => id === "9")?.exclude
        ? selection
            .find(({ id }) => id === "9")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityName
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "9")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityName} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.FacilityName &&
      selection.find(({ id }) => id === "9")?.entries &&
      selection.find(({ id }) => id === "9")?.exclude
        ? `${selection
            .find(({ id }) => id === "9")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityName
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "9")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityName} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "9")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityName
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "9")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityName} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.TestResult &&
      selection.find(({ id }) => id === "11")?.entries ||
      selection.find(({ id }) => id === "11")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.TestResult &&
      selection.find(({ id }) => id === "11")?.entries &&
      !selection.find(({ id }) => id === "11")?.exclude
        ? selection
            .find(({ id }) => id === "11")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.TestResult} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "11")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestResult} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.TestResult &&
      selection.find(({ id }) => id === "11")?.entries ||
      selection.find(({ id }) => id === "11")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.TestResult &&
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
                        dictionaryConverter.TestResult
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "11")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestResult} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.TestResult &&
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
                        dictionaryConverter.TestResult
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "11")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestResult} iLIKE '%${val}%') `
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
                        dictionaryConverter.TestResult
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "11")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.TestResult} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.DosageOfDrug &&
      selection.find(({ id }) => id === "12")?.entries ||
      selection.find(({ id }) => id === "12")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.DosageOfDrug &&
      selection.find(({ id }) => id === "12")?.entries &&
      !selection.find(({ id }) => id === "12")?.exclude
        ? selection
            .find(({ id }) => id === "12")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.DosageOfDrug} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "12")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageOfDrug} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.DosageOfDrug &&
      selection.find(({ id }) => id === "12")?.entries ||
      selection.find(({ id }) => id === "12")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.DosageOfDrug &&
      !selection.find(({ id }) => id === "12")?.entries &&
      selection.find(({ id }) => id === "12")?.exclude
        ? selection
            .find(({ id }) => id === "12")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageOfDrug
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "12")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageOfDrug} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.DosageOfDrug &&
      selection.find(({ id }) => id === "12")?.entries &&
      selection.find(({ id }) => id === "12")?.exclude
        ? `${selection
            .find(({ id }) => id === "12")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageOfDrug
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "12")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageOfDrug} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "12")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageOfDrug
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "12")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageOfDrug} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.DosageFrequency &&
      selection.find(({ id }) => id === "13")?.entries ||
      selection.find(({ id }) => id === "13")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.DosageFrequency &&
      selection.find(({ id }) => id === "13")?.entries &&
      !selection.find(({ id }) => id === "13")?.exclude
        ? selection
            .find(({ id }) => id === "13")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.DosageFrequency} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "13")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageFrequency} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.DosageFrequency &&
      selection.find(({ id }) => id === "13")?.entries ||
      selection.find(({ id }) => id === "13")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.DosageFrequency &&
      !selection.find(({ id }) => id === "13")?.entries &&
      selection.find(({ id }) => id === "13")?.exclude
        ? selection
            .find(({ id }) => id === "13")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageFrequency
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "13")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageFrequency} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.DosageFrequency &&
      selection.find(({ id }) => id === "13")?.entries &&
      selection.find(({ id }) => id === "13")?.exclude
        ? `${selection
            .find(({ id }) => id === "13")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageFrequency
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "13")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageFrequency} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "13")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DosageFrequency
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "13")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DosageFrequency} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Product &&
      selection.find(({ id }) => id === "15")?.entries ||
      selection.find(({ id }) => id === "15")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Product &&
      selection.find(({ id }) => id === "15")?.entries &&
      !selection.find(({ id }) => id === "15")?.exclude
        ? selection
            .find(({ id }) => id === "15")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Product} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "15")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Product} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Product &&
      selection.find(({ id }) => id === "15")?.entries ||
      selection.find(({ id }) => id === "15")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Product &&
      !selection.find(({ id }) => id === "15")?.entries &&
      selection.find(({ id }) => id === "15")?.exclude
        ? selection
            .find(({ id }) => id === "15")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Product
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "15")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Product} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Product &&
      selection.find(({ id }) => id === "15")?.entries &&
      selection.find(({ id }) => id === "15")?.exclude
        ? `${selection
            .find(({ id }) => id === "15")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Product} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "15")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Product} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "15")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Product
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "15")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Product} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Inpatient &&
      selection.find(({ id }) => id === "16")?.entries ||
      selection.find(({ id }) => id === "16")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Inpatient &&
      selection.find(({ id }) => id === "16")?.entries &&
      !selection.find(({ id }) => id === "16")?.exclude
        ? selection
            .find(({ id }) => id === "16")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Inpatient} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "16")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Inpatient} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Inpatient &&
      selection.find(({ id }) => id === "16")?.entries ||
      selection.find(({ id }) => id === "16")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Inpatient &&
      !selection.find(({ id }) => id === "16")?.entries &&
      selection.find(({ id }) => id === "16")?.exclude
        ? selection
            .find(({ id }) => id === "16")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Inpatient
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "16")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Inpatient} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Inpatient &&
      selection.find(({ id }) => id === "16")?.entries &&
      selection.find(({ id }) => id === "16")?.exclude
        ? `${selection
            .find(({ id }) => id === "16")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Inpatient} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "16")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Inpatient} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "16")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Inpatient
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "16")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Inpatient} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Outpatient &&
      selection.find(({ id }) => id === "17")?.entries ||
      selection.find(({ id }) => id === "17")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Outpatient &&
      selection.find(({ id }) => id === "17")?.entries &&
      !selection.find(({ id }) => id === "17")?.exclude
        ? selection
            .find(({ id }) => id === "17")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Outpatient} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "17")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Outpatient} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Outpatient &&
      selection.find(({ id }) => id === "17")?.entries ||
      selection.find(({ id }) => id === "17")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Outpatient &&
      !selection.find(({ id }) => id === "17")?.entries &&
      selection.find(({ id }) => id === "17")?.exclude
        ? selection
            .find(({ id }) => id === "17")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Outpatient
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "17")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Outpatient} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Outpatient &&
      selection.find(({ id }) => id === "17")?.entries &&
      selection.find(({ id }) => id === "17")?.exclude
        ? `${selection
            .find(({ id }) => id === "17")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Outpatient
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "17")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Outpatient} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "17")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Outpatient
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "17")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Outpatient} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.FacilityLocation &&
      selection.find(({ id }) => id === "18")?.entries ||
      selection.find(({ id }) => id === "18")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.FacilityLocation &&
      selection.find(({ id }) => id === "18")?.entries &&
      !selection.find(({ id }) => id === "18")?.exclude
        ? selection
            .find(({ id }) => id === "18")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${
                        dictionaryConverter.FacilityLocation
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "18")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityLocation} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.FacilityLocation &&
      selection.find(({ id }) => id === "18")?.entries ||
      selection.find(({ id }) => id === "18")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.FacilityLocation &&
      !selection.find(({ id }) => id === "18")?.entries &&
      selection.find(({ id }) => id === "18")?.exclude
        ? selection
            .find(({ id }) => id === "18")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityLocation
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "18")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityLocation} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.FacilityLocation &&
      selection.find(({ id }) => id === "18")?.entries &&
      selection.find(({ id }) => id === "18")?.exclude
        ? `${selection
            .find(({ id }) => id === "18")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityLocation
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "18")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityLocation} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "18")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.FacilityLocation
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "18")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.FacilityLocation} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }
${dictionaryConverter.PatientID &&
  selection.find(({ id }) => id === "19")?.entries ||
  selection.find(({ id }) => id === "19")?.exclude
    ? "AND ("
    : ""
}${dictionaryConverter.PatientID &&
      selection.find(({ id }) => id === "19")?.entries &&
      !selection.find(({ id }) => id === "19")?.exclude
        ? selection
            .find(({ id }) => id === "19")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.PatientID} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "19")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.PatientID} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.PatientID &&
      selection.find(({ id }) => id === "19")?.entries ||
      selection.find(({ id }) => id === "19")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.PatientID &&
      !selection.find(({ id }) => id === "19")?.entries &&
      selection.find(({ id }) => id === "19")?.exclude
        ? selection
            .find(({ id }) => id === "19")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.PatientID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "19")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.PatientID} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.PatientID &&
      selection.find(({ id }) => id === "19")?.entries &&
      selection.find(({ id }) => id === "19")?.exclude
        ? `${selection
            .find(({ id }) => id === "19")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.PatientID} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "19")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.PatientID} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "19")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.PatientID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "19")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.PatientID} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.SpecimenType &&
      selection.find(({ id }) => id === "20")?.entries ||
      selection.find(({ id }) => id === "20")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.SpecimenType &&
      selection.find(({ id }) => id === "20")?.entries &&
      !selection.find(({ id }) => id === "20")?.exclude
        ? selection
            .find(({ id }) => id === "20")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.SpecimenType} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "20")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SpecimenType} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.SpecimenType &&
      selection.find(({ id }) => id === "20")?.entries ||
      selection.find(({ id }) => id === "20")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.SpecimenType &&
      !selection.find(({ id }) => id === "20")?.entries &&
      selection.find(({ id }) => id === "20")?.exclude
        ? selection
            .find(({ id }) => id === "20")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SpecimenType
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "20")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SpecimenType} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.SpecimenType &&
      selection.find(({ id }) => id === "20")?.entries &&
      selection.find(({ id }) => id === "20")?.exclude
        ? `${selection
            .find(({ id }) => id === "20")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SpecimenType
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "20")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SpecimenType} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "20")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SpecimenType
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "20")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SpecimenType} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.DateOfBirth &&
      selection.find(({ id }) => id === "24")?.entries ||
      selection.find(({ id }) => id === "24")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.DateOfBirth &&
      selection.find(({ id }) => id === "24")?.entries &&
      !selection.find(({ id }) => id === "24")?.exclude
        ? selection
            .find(({ id }) => id === "24")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.DateOfBirth} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "24")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DateOfBirth} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.DateOfBirth &&
      selection.find(({ id }) => id === "24")?.entries ||
      selection.find(({ id }) => id === "24")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.DateOfBirth &&
      !selection.find(({ id }) => id === "24")?.entries &&
      selection.find(({ id }) => id === "24")?.exclude
        ? selection
            .find(({ id }) => id === "24")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DateOfBirth
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "24")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DateOfBirth} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.DateOfBirth &&
      selection.find(({ id }) => id === "24")?.entries &&
      selection.find(({ id }) => id === "24")?.exclude
        ? `${selection
            .find(({ id }) => id === "24")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DateOfBirth
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "24")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DateOfBirth} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "24")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.DateOfBirth
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "24")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.DateOfBirth} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }
${dictionaryConverter.SateOfOrigin &&
  selection.find(({ id }) => id === "25")?.entries ||
  selection.find(({ id }) => id === "25")?.exclude
    ? "AND ("
    : ""
}  ${dictionaryConverter.SateOfOrigin &&
      selection.find(({ id }) => id === "25")?.entries &&
      !selection.find(({ id }) => id === "25")?.exclude
        ? selection
            .find(({ id }) => id === "25")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.SateOfOrigin} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "25")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SateOfOrigin} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.SateOfOrigin &&
      selection.find(({ id }) => id === "25")?.entries ||
      selection.find(({ id }) => id === "25")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.SateOfOrigin &&
      !selection.find(({ id }) => id === "25")?.entries &&
      selection.find(({ id }) => id === "25")?.exclude
        ? selection
            .find(({ id }) => id === "25")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SateOfOrigin
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "25")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SateOfOrigin} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.SateOfOrigin &&
      selection.find(({ id }) => id === "25")?.entries &&
      selection.find(({ id }) => id === "25")?.exclude
        ? `${selection
            .find(({ id }) => id === "25")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SateOfOrigin
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "25")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SateOfOrigin} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "25")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.SateOfOrigin
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "25")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.SateOfOrigin} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries ||
      selection.find(({ id }) => id === "26")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries &&
      !selection.find(({ id }) => id === "26")?.exclude
        ? selection
            .find(({ id }) => id === "26")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.ProviderID} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries ||
      selection.find(({ id }) => id === "26")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.ProviderID &&
      !selection.find(({ id }) => id === "26")?.entries &&
      selection.find(({ id }) => id === "26")?.exclude
        ? selection
            .find(({ id }) => id === "26")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries &&
      selection.find(({ id }) => id === "26")?.exclude
        ? `${selection
            .find(({ id }) => id === "26")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "26")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries ||
      selection.find(({ id }) => id === "26")?.exclude
        ? "AND ("
        : ""
    }  ${
      selection.find(({ id }) => id === "26")?.entries &&
      !selection.find(({ id }) => id === "26")?.exclude
        ? selection
            .find(({ id }) => id === "26")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.ProviderID} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries ||
      selection.find(({ id }) => id === "26")?.exclude
        ? ")"
        : ""
    }${
      !selection.find(({ id }) => id === "26")?.entries &&
      selection.find(({ id }) => id === "26")?.exclude
        ? selection
            .find(({ id }) => id === "26")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.ProviderID &&
      selection.find(({ id }) => id === "26")?.entries &&
      selection.find(({ id }) => id === "26")?.exclude
        ? `${selection
            .find(({ id }) => id === "26")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "26")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.ProviderID
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "26")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.ProviderID} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${dictionaryConverter.Specialty &&
      selection.find(({ id }) => id === "28")?.entries ||
      selection.find(({ id }) => id === "28")?.exclude
        ? "AND ("
        : ""
    }  ${dictionaryConverter.Specialty &&
      selection.find(({ id }) => id === "28")?.entries &&
      !selection.find(({ id }) => id === "28")?.exclude
        ? selection
            .find(({ id }) => id === "28")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? `${dictionaryConverter.Specialty} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "28")
                          ?.entries?.split(",").length === 1
                          ? ""
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Specialty} iLIKE '%${val}%'`
                }`
            )
            .join("")
        : ""
    } ${dictionaryConverter.Specialty &&
      selection.find(({ id }) => id === "28")?.entries ||
      selection.find(({ id }) => id === "28")?.exclude
        ? ")"
        : ""
    }${dictionaryConverter.Specialty &&
      !selection.find(({ id }) => id === "28")?.entries &&
      selection.find(({ id }) => id === "28")?.exclude
        ? selection
            .find(({ id }) => id === "28")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Specialty
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "28")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Specialty} NOT iLIKE '%${val}%') `
                }`
            )
            .join("")
        : ""
    }${dictionaryConverter.Specialty &&
      selection.find(({ id }) => id === "28")?.entries &&
      selection.find(({ id }) => id === "28")?.exclude
        ? `${selection
            .find(({ id }) => id === "28")
            ?.entries?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${dictionaryConverter.Specialty} iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "28")
                          ?.entries?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Specialty} iLIKE '%${val}%') `
                }`
            )
            .join("")} ${selection
            .find(({ id }) => id === "28")
            ?.exclude?.split(",")
            .map(
              (val, index) =>
                `${
                  index === 0
                    ? ` AND (${
                        dictionaryConverter.Specialty
                      } NOT iLIKE '%${val}%'${
                        selection
                          .find(({ id }) => id === "28")
                          ?.exclude?.split(",").length === 1
                          ? ")"
                          : ""
                      }`
                    : ` OR ${dictionaryConverter.Specialty} NOT iLIKE '%${val}%')`
                }`
            )
            .join("")}`
        : ""
    }${
        dictionaryConverter.date
          ? `AND ${dictionaryConverter.date} BETWEEN '${entries?.startDate}' AND '${entries?.endDate}'`
          : ""
      } LIMIT ${entries?.sampleSize?.toLocaleString()}`;
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
}
