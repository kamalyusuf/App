import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { Container } from "../components/Container";
import { NavBarLayout } from "../components/Layouts";
import Head from "next/head";

const Home: NextPage = () => {
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

export default Home;
