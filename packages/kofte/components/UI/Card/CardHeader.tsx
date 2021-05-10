import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  action?: React.ReactNode;
  p?: boolean;
}

export const CardHeader = (props: Props) => {
  const { title, action, p } = props;
  return (
    <Flex
      align="center"
      justify="space-between"
      px={p ? "6" : undefined}
      py="4"
      borderBottomWidth="1px"
    >
      <Heading as="h2" fontSize="lg">
        {title}
      </Heading>
      {action}
    </Flex>
  );
};

CardHeader.defaultProps = {
  p: true
};
