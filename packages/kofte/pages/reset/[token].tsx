import { Box, Button, Stack, useColorModeValue, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card, PasswordField } from "../../components/UI";
import { useResetPasswordMutation } from "../../hooks";
import * as yup from "yup";

const InvalidToken = (
  <Text fontSize="2xl" color="red" fontWeight="bold" textAlign="center">
    Invalid Token
  </Text>
);

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
});

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const { mutateAsync } = useResetPasswordMutation();
  const [no, setNo] = useState<boolean>(false);

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
      <Box maxW="md" mx="auto">
        <Card>
          {no && InvalidToken}
          <Formik
            initialValues={{ password: "" }}
            onSubmit={async ({ password }) => {
              if (!token || typeof token !== "string") {
                setNo(true);
                return;
              }

              await mutateAsync(
                { password, token },
                {
                  onSuccess: () => {
                    router.replace("/login");
                  }
                }
              );
            }}
            validationSchema={validationSchema}
            validateOnChange
          >
            {({ isSubmitting, values: { password } }) => (
              <Form>
                <Stack spacing={8}>
                  <PasswordField showForgotPassword={false} />
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    disabled={isSubmitting || !password}
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

export default ResetPassword;
