import { Box, Heading, useColorModeValue, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { RegisterForm } from "../../components/Forms";
import { Card, Link } from "../../components/UI";
import { ICredentials } from "@app/water";

const Register: NextPage = () => {
  const onSubmit = ({ email, password }: ICredentials) => {
    console.log({ email, password });
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Create an account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Already have an account?</Text>
          <Link href="/login" text="Sign in" />
        </Text>
        <Card>
          <RegisterForm onSubmit={onSubmit} />
        </Card>
      </Box>
    </Box>
  );
};

export default Register;
