import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import React from "react";
import { useMeQuery, useResendVerificationEmailMutation } from "../../hooks";

export const VerifyEmailBanner: React.FC = () => {
  const { me } = useMeQuery();
  const { mutateAsync, isLoading } = useResendVerificationEmailMutation();
  const toast = useToast();

  if (!me || me.email_verified) {
    return null;
  }

  const resendVerificationEmail = async () => {
    await mutateAsync(
      {},
      {
        onSuccess: (data) => {
          toast({
            description: data.message,
            status: "success",
            duration: 2500,
            isClosable: true,
            position: "top-right"
          });
        }
      }
    );
  };

  return (
    <Box as="section">
      <Stack
        direction={{ base: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        py="3"
        px={{ base: "3", md: "6", lg: "8" }}
        color="white"
        bg={useColorModeValue("blue.600", "blue.400")}
      >
        <HStack spacing="3">
          <Icon as={BellIcon} fontSize="2xl" h="10" />
          <Text fontWeight="medium" marginEnd="2">
            Verify your email. Check your email. We&apos;ve sent a message to{" "}
            <b>{me.email}</b>
          </Text>
        </HStack>
        <Button
          colorScheme="whiteAlpha"
          color="white"
          variant="outline"
          borderColor="whiteAlpha.400"
          px={6}
          isLoading={isLoading}
          onClick={resendVerificationEmail}
        >
          Resend email
        </Button>
      </Stack>
    </Box>
  );
};
