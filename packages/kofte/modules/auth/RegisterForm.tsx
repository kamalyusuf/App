import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { InputErrorMessage, PasswordField } from "../../components";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as yup from "yup";
import { api } from "../../lib";
import { IResponseError, IUser } from "@app/water";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";

export const transformErrors = (errors: Required<IResponseError>[]) => {
  const error: Record<string, string> = {};
  errors.forEach(({ message, field }) => {
    error[field] = message;
  });
  return error;
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
});

export const RegisterForm: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { data } = await api.post<IUser>("/auth/signup", values);
            queryClient.setQueryData("/auth/me", () => data);
            router.replace("/account");
          } catch (e) {
            setErrors(transformErrors(e.response.data.errors));
          }
        }}
        validationSchema={validationSchema}
        validateOnMount
        validateOnChange
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Stack spacing={8}>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input {...field} type="email" />
                    <ErrorMessage name="email" component={InputErrorMessage} />
                  </FormControl>
                )}
              </Field>
              <PasswordField />
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                disabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
              >
                Create my account
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};
