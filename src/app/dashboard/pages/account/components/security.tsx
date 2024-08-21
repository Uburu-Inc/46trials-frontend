"use client";

import { useFormik } from "formik";
import { ButtonComponent } from "@/app/components/reusable-components/button"
import { accountSchema } from "@/app/dashboard/hooks/account/schema";
import { TextInput } from "@/app/components/reusable-components/input/text-input";

export function Security() {
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validationSchema: accountSchema,
    onSubmit: (payload) => console.log(payload),
  });
  return (
    <div className="w-[40rem]">
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          className="w-full"
          label="Old Password"
          value={formik.values.old_password}
          name="old_password"
          error={formik.errors.old_password}
          onChange={formik.handleChange}
        />
        <div className="mt-3">
          <TextInput
            className="w-full"
            label="New Password"
            value={formik.values.new_password}
            name="new_password"
            error={formik.errors.new_password}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mt-3">
          <TextInput
            className="w-full"
            label="Confirm new password"
            value={formik.values.confirm_new_password}
            name="confirm_new_password"
            error={formik.errors.confirm_new_password}
            onChange={formik.handleChange}
          />
        </div>

        <ButtonComponent className="mt-8">Update</ButtonComponent>
      </form>
    </div>
  );
}
