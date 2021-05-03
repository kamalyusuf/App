import { chakra, useColorModeValue } from "@chakra-ui/system";
import * as React from "react";
import NextLink from "next/link";

interface Props {
  href: string;
  text: string;
  color?: [string, string];
  hoverColor?: [string, string];
  fontSize?: string;
}

export const Link: React.FC<Props> = ({
  href,
  text,
  color,
  hoverColor,
  fontSize
}) => {
  return (
    <NextLink href={href}>
      <chakra.a
        marginStart="1"
        // href="#"
        color={useColorModeValue(color![0], color![1])}
        _hover={{ color: useColorModeValue(hoverColor![0], hoverColor![1]) }}
        display={{ base: "block", sm: "inline" }}
        sx={{ cursor: "pointer" }}
        fontSize={fontSize ? fontSize : undefined}
      >
        {text}
      </chakra.a>
    </NextLink>
  );
};

Link.defaultProps = {
  color: ["blue.500", "blue.200"],
  hoverColor: ["blue.600", "blue.300"]
};
