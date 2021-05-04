import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export const CardContent = ({ children, ...props }: BoxProps) => (
  <Box {...props}>{children}</Box>
);
