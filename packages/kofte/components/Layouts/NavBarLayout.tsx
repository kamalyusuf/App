import { Box } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../NavBar";
import { VerifyEmailBanner } from "../VerifyEmailBanner";

export const NavBarLayout: React.FC = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <VerifyEmailBanner />
      {children}
    </Box>
  );
};
