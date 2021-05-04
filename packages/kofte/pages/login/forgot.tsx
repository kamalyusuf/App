import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useState } from "react";
import { Formik, Field, Form, FieldProps } from "formik";
import { Card, SuccessMessage } from "../../components/UI";
import { useForgotPasswordMutation } from "../../hooks";

const LoginForgot: NextPage = () => {
  const { mutateAsync } = useForgotPasswordMutation();
  const [done, setDone] = useState<boolean>(false);

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
      <Box maxW="md" mx="auto">
        <Card>
          {done && (
            <SuccessMessage>
              If we find a match, you'll get an email with a link to reset your
              password shortly
            </SuccessMessage>
          )}
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              await mutateAsync(values, {
                onSuccess: (data) => {
                  setDone(true);
                }
              });
            }}
          >
            {({ isSubmitting, values: { email } }) => (
              <Form>
                <Stack spacing={8}>
                  <Field name="email">
                    {({ field }: FieldProps) => (
                      <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    disabled={isSubmitting || !email || done}
                    isLoading={isSubmitting}
                  >
                    Reset Password
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginForgot;

// If we find a match, you'll get an email with a link to reset your password shortly
