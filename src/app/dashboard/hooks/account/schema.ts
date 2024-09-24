import * as Yup from "yup";

export const accountSchema = Yup.object({
  old_password: Yup.string().required("Old password is required"),
  new_password: Yup.string().required("New password is required"),
  confirm_new_password: Yup.string()
    .required("Confirm new password is required")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});
