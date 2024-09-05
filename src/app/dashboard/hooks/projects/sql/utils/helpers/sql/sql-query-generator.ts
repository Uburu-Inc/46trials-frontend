import {
  RequiredColumnProps,
  CreateProjectValidationInitialProps,
} from "../../type";

interface Props {
  selection: Array<RequiredColumnProps>;
  entries?: CreateProjectValidationInitialProps;
}

export const sqlQueryGenerator = ({ selection, entries }: Props) => {
  return {
    laboratoryQuery: {
      countQuery: {},
      datasetQuery: {},
    },
    emrQuery: {
      countQuery: {},
      datasetQuery: {},
    },
    claimsQuery: {
      countQuery: {},
      datasetQuery: {},
    },
  };
};
