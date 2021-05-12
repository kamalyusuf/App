import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { withAuth } from "../../hocs/withAuth";
import {
  useMeQuery,
  useSearchParams,
  useVerifyEmailMutation
} from "../../hooks";

const InvalidEmailOrToken = (
  <Center w="100%" h="100%" bg="gray.50">
    <Text fontSize="2xl" color="red" fontWeight="bold">
      Invalid email or token
    </Text>
  </Center>
);

const EmailVerified = (
  <Center w="100%" h="100%" bg="gray.50">
    <Text fontSize="2xl" color="green" fontWeight="bold">
      Email verified
    </Text>
  </Center>
);

const AlreadyVerified = (
  <Center w="100%" h="100%" bg="gray.50">
    <Text fontSize="2xl" color="blue" fontWeight="bold">
      Email address has already been verified
    </Text>
  </Center>
);

const YouAreLoggedInWithAnotherAccount = (
  <Center w="100%" h="100%" bg="gray.50">
    <Text fontSize="2xl" color="red" fontWeight="bold">
      You are logged in with another account. Please logout and login with the
      corresponding account to proceed with verification
    </Text>
  </Center>
);

const VerifyPage: NextPage = () => {
  const token = useSearchParams("token");
  const email = useSearchParams("email");
  const { mutateAsync, isLoading } = useVerifyEmailMutation();
  const [verified, setVerified] = useState(false);
  const { me } = useMeQuery();

  if (!token || !email) {
    return InvalidEmailOrToken;
  }

  if (email !== me?.email) {
    return YouAreLoggedInWithAnotherAccount;
  }

  if (me?.email_verified) {
    return AlreadyVerified;
  }

  return verified ? (
    EmailVerified
  ) : (
    <>
      <Head>
        <title>App | Verify Email</title>
      </Head>
      <Box bg="gray.50" w="100%" h="100%" mt="10%">
        <Center>
          <Formik
            initialValues={{ token, email }}
            onSubmit={async (values) => {
              await mutateAsync(values, {
                onSuccess: (data) => {
                  setVerified(true);
                }
              });
            }}
          >
            {({ values: { token, email } }) => (
              <Form>
                <Stack>
                  <Field name="email">
                    {({ field }: FieldProps) => (
                      <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="token">
                    {({ field }: FieldProps) => (
                      <FormControl>
                        <FormLabel>Token</FormLabel>
                        <Input {...field} type="text" />
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    disabled={isLoading || !token || !email}
                    isLoading={isLoading}
                  >
                    Verify
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Center>
      </Box>
    </>
  );
};

export default withAuth(VerifyPage);
