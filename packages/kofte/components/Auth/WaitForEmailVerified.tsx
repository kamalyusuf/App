import React from "react";
import { useMeQuery } from "../../hooks";
import { Center, Text } from "@chakra-ui/react";

export const WaitForEmailVerified: React.FC = ({ children }) => {
  const { me } = useMeQuery();

  if (!me?.email_verified) {
    return (
      <Center>
        <Text color="blue.300" fontWeight="bold" fontSize="2xl" mt={12}>
          You need to verify your email to access teams
        </Text>
      </Center>
    );
  }

  return <>{children}</>;
};
