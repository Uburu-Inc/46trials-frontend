"use client";

import Link from "next/link";
import { AppIcon } from "@/components/icons/app-icon";
import { TextInput } from "@/components/input/text-input";
import { useFormik } from "formik";
import { useLogin } from "@/app/hooks/login";
import { loginSchema } from "@/app/hooks/login/schema";
import { ButtonComponent } from "@/components/button";
import { Card } from "@/components/shadcn-components/card";

export function LoginForm() {
  const { loading, handleLogin } = useLogin();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (payload) => handleLogin(payload),
  });

  return (
    <Card className="px-16 py-16 rounded-xl">
      <div className="w-full h-full">
        <div className="flex justify-center">
          <Link href="/" className="cursor-pointer">
            <AppIcon />
          </Link>
        </div>

        <div>
          <p className="text-center font-bold mt-3 text-sm">Sign into your account</p>
          <p className="text-[#505A62] mt-4 font-[330] mb-5 text-center text-sm">
            Fill in your email address and the password that corresponds to it.
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <TextInput
                className="w-full"
                label="Email"
                value={formik.values.email}
                name="email"
                error={formik.errors.email}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mt-8">
              <TextInput
                className="w-full"
                type="password"
                label="Password"
                value={formik.values.password}
                name="password"
                error={formik.errors.password}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mt-5">
              <ButtonComponent
                className="w-full bg-[black] mt-10 py-6"
                loading={loading}
              >
                {loading ? "Loading..." : "Sign in"}
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}
