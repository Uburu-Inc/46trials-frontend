import * as yup from "yup";

export const createProjectValidation = yup.object().shape({
  projectName: yup.string().required("Project name is needed"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  sampleSize: yup.number().required("Sample size is required"),
});
