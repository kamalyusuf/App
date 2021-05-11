import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { InputErrorMessage, PasswordField } from "../UI";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import { api } from "../../lib";
import { IUser } from "@app/water";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { transformErrors } from "./RegisterForm";

export const LoginForm: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const redirect = router.asPath.split("redirect=")[1];

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { data } = await api.post<IUser>("/auth/signin", values);
            queryClient.setQueryData("/auth/me", () => data);
            router.replace(redirect ? redirect : "/account");
          } catch (e) {
            setErrors(transformErrors(e.response.data.errors));
          }
        }}
        validateOnChange={false}
      >
        {({ isSubmitting, values: { email, password } }) => (
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
                disabled={isSubmitting || !email || !password}
                isLoading={isSubmitting}
              >
                Sign in
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};
