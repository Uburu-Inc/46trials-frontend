import {
  SelectProps,
  KeysOnlyProps,
  CustomCompareProps,
  KeyValuePairProps,
} from "./type";

export const sqlQueryBuilder = {
  SELECT({ items, DISTINCT, all, anyField }: SelectProps) {
    if (items) {
      return `SELECT ${items
        .map(
          (item, index) =>
            `${DISTINCT ? "DISTINCT " : ""}${item}${
              index + 1 === items.length ? "" : ","
            } `
        )
        .join(" ")} `;
    }

    if (anyField) return `SELECT ${anyField} `;

    if (all) return `SELECT * `;

    return "";
  },

  SELECT_COUNT({ items, DISTINCT, all, specific, anyField }: SelectProps) {
    if (items) {
      return `SELECT COUNT(${items
        .map(
          (item, index) =>
            `${DISTINCT ? "DISTINCT " : ""}${item}${
              index + 1 === items.length ? "" : ","
            } `
        )
        .join(" ")})`;
    }

    if (anyField) return `SELECT COUNT(${anyField}) `;

    if (specific) return `SELECT COUNT(EXTRACT(${specific})) `;

    if (all) return `SELECT COUNT(*) `;

    return "";
  },

  FROM({ table }: { table: string }) {
    return `FROM ${table} `;
  },

  WHERE({ key }: KeysOnlyProps) {
    if (!key) return "";
    return {
      EQUAL_TO({ value }: KeyValuePairProps) {
        return value
          ? `WHERE (${key} = ${typeof value === "number" ? value : `'${value}'`})`
          : "";
      },

      GREATER_THAN({ value }: KeyValuePairProps) {
        return value
          ? `WHERE (${key} > ${typeof value === "number" ? value : `'${value}'`})`
          : "";
      },

      GREATER_THAN_OR_EQUAL_TO({ value }: KeyValuePairProps) {
        return value
          ? `WHERE (${key} >= ${typeof value === "number" ? value : `'${value}'`})`
          : "";
      },

      LESS_THAN({ value }: KeyValuePairProps) {
        return value
          ? `WHERE (${key} < ${typeof value === "number" ? value : `'${value}'`})`
          : "";
      },

      LESS_THAN_OR_EQUAL_TO({ value }: KeyValuePairProps) {
        return value
          ? `WHERE (${key} <= ${typeof value === "number" ? value : `'${value}'`})`
          : "";
      },

      NOT_EQUAL_TO({ value }: KeyValuePairProps) {
        return value
          ? `WHERE (${key} <> ${typeof value === "number" ? value : `'${value}'`})`
          : "";
      },

      LIKE({ value }: KeyValuePairProps) {
        return value
          ? `WHERE (${key} iLIKE ${
              typeof value === "number" ? value : `'%${value}%'`
            })`
          : "";
      },

      LIKES({ values }: { values: Array<string> }) {
        return values
          ? `WHERE ${values.length > 1 ? "(" : ""} ${values
              .map(
                (val, index) =>
                  `${index === 0 ? "" : " OR "} (${key} iLIKE ${
                    typeof val === "number" ? val : `'%${val}%'`
                  })`
              )
              .join("")} ${values.length > 1 ? ")" : ""}`
          : "";
      },

      NOT_LIKE({ value }: KeyValuePairProps) {
        return value
          ? `WHERE (${key} NOT iLIKE ${
              typeof value === "number" ? value : `'%${value}%'`
            })`
          : "";
      },

      NOT_LIKES({ values }: { values: Array<string> }) {
        return values
          ? `AND (${values
              .map(
                (val, index) =>
                  `${index === 0 ? "" : " OR "} ${key} NOT iLIKE ${
                    typeof val === "number" ? val : `'%${val}%'`
                  }`
              )
              .join("")})`
          : "";
      },

      EXTRACT({ value }: { value: string }) {
        return `WHERE EXTRACT(${value}) `;
      },
    };
  },

  COMPARE({ query }: { query?: Array<CustomCompareProps> }) {
    if (query) {
      const sqlQuery = query.map(({ key, value, operator, sqlKeyWord }, index) => {
        if (key && value && operator && sqlKeyWord) {
          return ` ${sqlKeyWord} ${key} ${operator} ${typeof value === "number" ? value : `'${operator === 'iLIKE' || operator === 'NOT iLIKE' ? '%':''}${value}${operator === 'iLIKE' || operator === 'NOT iLIKE' ? '%':''}'`}${index + 1 === query.length ? " ":""}`
        } else return "";
      });

      return sqlQuery.toLocaleString().replaceAll(",","");
    } else return "";
  },


  LIMIT({ value }: KeyValuePairProps) {
    return value ? `LIMIT ${value}` : "";
  },
};
