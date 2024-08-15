/* READ THE CODE PROPERLY BEFORE MAKING EDITS TO THIS FILE */

export interface SelectProps {
  items?: Array<string>;
  DISTINCT?: string;
  all?: string;
  specific?: string;
  anyField?: string;
}

export interface KeyValuePairProps {
  key?: string;
  value?: string | number | Array<string | number>
}

export interface KeysOnlyProps {
  key?: string;
}

export interface CustomCompareProps extends KeyValuePairProps {
  operator: '=' | '>' | '>=' | '<' | '<=' | '<>' | 'iLIKE' | 'NOT iLIKE';
  sqlKeyWord: "WHERE" | "FROM" | "OR" | "AND";
}
