import { Box } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../../hooks";
import { NavBar } from "../NavBar";
import { VerifyEmailBanner } from "../../modules/auth/VerifyEmailBanner";

interface Props {
  showVerifyEmailBanner?: boolean;
}

export const NavBarLayout: React.FC<Props> = ({
  children,
  showVerifyEmailBanner
}) => {
  const { me } = useMeQuery();

  return (
    <Box>
      <NavBar />
      {showVerifyEmailBanner && me && !me.email_verified && (
        <VerifyEmailBanner />
      )}
      {children}
    </Box>
  );
};

NavBarLayout.defaultProps = {
  showVerifyEmailBanner: true
};
