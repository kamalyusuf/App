import { Box, Heading, useColorModeValue, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { RegisterForm } from "../../modules/auth";
import { Card, Link } from "../../components";
import { withNoAuth } from "../../hocs/withNoAuth";
import Head from "next/head";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>App | Register</title>
      </Head>
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
            <RegisterForm />
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default withNoAuth(RegisterPage);
