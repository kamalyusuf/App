import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { Container, NavBarLayout } from "../components";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>App | Home</title>
      </Head>
      <NavBarLayout>
        <Container>
          <Box>
            <h1>I am Home</h1>
          </Box>
        </Container>
      </NavBarLayout>
    </>
  );
};

export default HomePage;
