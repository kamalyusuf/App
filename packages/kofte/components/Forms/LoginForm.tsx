import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { InputErrorMessage, PasswordField } from "../UI";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { api } from "../../lib";
import { IUser } from "@app/water";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { transformErrors } from "./RegisterForm";

export const LoginForm: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{ email: "kbomoi@yahoo.com", password: "kamalkamal" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { data } = await api.post<IUser>("/auth/signin", values);
            queryClient.setQueryData("/auth/me", () => data);
            router.push("/profile");
          } catch (e) {
            setErrors(transformErrors(e.response.data.errors));
          }
        }}
        validateOnChange={false}
      >
        {({ isSubmitting, isValid, values: { email, password } }) => (
          <Form>
            <Stack spacing={8}>
              <Field name="email">
                {({ field, form }: any) => (
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
                disabled={!isValid || isSubmitting || !email || !password}
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
