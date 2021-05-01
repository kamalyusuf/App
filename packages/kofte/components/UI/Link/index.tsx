import { chakra, useColorModeValue } from "@chakra-ui/system";
import * as React from "react";
import NextLink from "next/link";

interface Props {
  href: string;
  text: string;
}

export const Link: React.FC<Props> = ({ href, text }) => {
  return (
    <NextLink href={href}>
      <chakra.a
        marginStart="1"
        // href="#"
        color={useColorModeValue("blue.500", "blue.200")}
        _hover={{ color: useColorModeValue("blue.600", "blue.300") }}
        display={{ base: "block", sm: "inline" }}
        sx={{ cursor: "pointer" }}
      >
        {text}
      </chakra.a>
    </NextLink>
  );
};
