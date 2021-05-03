import { NextPage } from "next";
import React, { useState } from "react";
import {
  useMeQuery,
  useSearchParams,
  useVerifyEmailMutation
} from "../../hooks";
import {
  Box,
  Center,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { withAuth } from "../../hocs/withAuth";

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

const Verify: NextPage = () => {
  const token = useSearchParams("token");
  const email = useSearchParams("email");
  const { mutateAsync, isLoading } = useVerifyEmailMutation();
  const [verified, setVerified] = useState(false);
  const { me } = useMeQuery();

  if (!token || !email) return InvalidEmailOrToken;

  if (me?.email_verified) return AlreadyVerified;

  return verified ? (
    EmailVerified
  ) : (
    <Box bg="gray.50" w="100%" h="100%">
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
  );
};

export default withAuth(Verify);
