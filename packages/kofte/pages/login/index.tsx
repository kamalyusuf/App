import { NextPage } from "next";
import { Box, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Card, Link } from "../../components";
import { LoginForm } from "../../modules/auth";
import { withNoAuth } from "../../hocs/withNoAuth";
import Head from "next/head";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>App | Login</title>
      </Head>
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
            <LoginForm />
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default withNoAuth(LoginPage);
