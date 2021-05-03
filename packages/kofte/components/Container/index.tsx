import React from "react";
import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

export const Container: React.FC = ({ children, ...props }: ContainerProps) => {
  return (
    <ChakraContainer maxW="container.xl" {...props}>
      {children}
    </ChakraContainer>
  );
};
