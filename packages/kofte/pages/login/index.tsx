import { NextPage } from "next";
import { Box, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Card, Link } from "../../components/UI";
import { ICredentials } from "@app/water";
import { LoginForm } from "../../components/Forms";

const Login: NextPage = () => {
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
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account?</Text>
          <Link href="/register" text="Sign up" />
        </Text>
        <Card>
          <LoginForm onSubmit={onSubmit} />
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
