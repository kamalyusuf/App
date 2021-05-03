import React from "react";
import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

type Props = ContainerProps;

export const Container: React.FC<Props> = ({ children, ...props }) => {
  return (
    <ChakraContainer maxW="container.xl" {...props}>
      {children}
    </ChakraContainer>
  );
};
