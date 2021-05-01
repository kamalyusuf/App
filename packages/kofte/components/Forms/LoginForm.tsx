import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { InputErrorMessage, PasswordField } from "../UI";
import { Formik, Field, Form, ErrorMessage } from "formik";

export const LoginForm: React.FC = () => {
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log("onSubmit values", values);
        }}
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
