import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

interface Props {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  centered?: boolean;
  thickness?: string;
  color?: string;
}

export const LoadingSpinner: React.FC<Props> = ({
  size,
  centered,
  thickness,
  color
}) => {
  const C = <Spinner size={size} thickness={thickness} color={color} />;
  return centered ? (
    <Center w="100%" h="100%">
      {C}
    </Center>
  ) : (
    C
  );
};

LoadingSpinner.defaultProps = {
  centered: true,
  size: "xl",
  thickness: "4px",
  color: "blue.500"
};
