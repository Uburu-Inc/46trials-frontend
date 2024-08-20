interface Props {
  text: string;
  operator: string;
}

export const sqlQueryOperators: Array<Props> = [
  { text: "Between start point and end point", operator: "BETWEEN" },
  { text: "Greater than or equal to", operator: ">=" },
  { text: "Equal to", operator: "=" },
  { text: "Less than", operator: "<" },
  { text: "Not equal to", operator: "!=" },
];
