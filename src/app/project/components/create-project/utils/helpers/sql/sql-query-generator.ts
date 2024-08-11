import { laboratoryQuery } from "./queries/laboratory-query";
import { emrQuery } from "./queries/emr-query";
import { claimsQuery } from "./queries/claims-query";

import { RequiredColumnProps, CreateProjectValidationInitialProps } from "../../type";

interface Props {
  selection: Array<RequiredColumnProps>;
  entries?: CreateProjectValidationInitialProps;
}

export const sqlQueryGenerator = ({ selection, entries }: Props) => {
  return {
    laboratoryQuery: {
      countQuery: laboratoryQuery({ selection, action: "count", entries }),
      datasetQuery: laboratoryQuery({ selection, action: "dataset", entries }),
    },
    emrQuery: {
      countQuery: emrQuery({ selection, action: "count", entries }),
      datasetQuery: emrQuery({ selection, action: "dataset", entries }),
    },
    claimsQuery: {
      countQuery: claimsQuery({ selection, action: "count", entries }),
      datasetQuery: claimsQuery({ selection, action: "dataset", entries }),
    },
  };
};
