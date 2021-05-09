import React from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Icon,
  IconButton
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdClose } from "react-icons/md";

interface Props {
  label: string;
  value: any;
  icon?: IconType;
  isLoading?: boolean;
  revokeConnection?: () => void;
}

export const CardProperty = (props: Props) => {
  const {
    label,
    value,
    icon,
    revokeConnection,
    isLoading,
    ...flexProps
  } = props;
  return (
    <Flex
      as="dl"
      direction={{ base: "column", sm: "row" }}
      px="6"
      py="4"
      _even={{ bg: useColorModeValue("gray.50", "gray.600") }}
      {...flexProps}
      align="center"
    >
      <Flex sx={{ gap: "1em" }} minWidth="180px">
        {icon && <Icon boxSize={6} as={icon} />}
        <Box as="dt">{label}</Box>
      </Flex>

      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>

      {revokeConnection && (
        <Box>
          <IconButton
            aria-label="Revoke connection"
            icon={<MdClose />}
            isLoading={isLoading}
            variant="ghost"
            colorScheme="red"
            fontSize="28px"
            onClick={(e) => {
              revokeConnection?.();
            }}
          />
        </Box>
      )}
    </Flex>
  );
};
