import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { Container } from "../components/Container";
import { NavBarLayout } from "../components/Layouts";

const Home: NextPage = () => {
  return (
    <NavBarLayout>
      <Container>
        <Box>
          <h1>I am Home</h1>
        </Box>
      </Container>
    </NavBarLayout>
  );
};

export default Home;
