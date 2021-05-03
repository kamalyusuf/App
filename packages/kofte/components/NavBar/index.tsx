import { Box, Stack, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "../UI";
import NextLink from "next/link";
import { Container } from "../Container";
import { useMeQuery } from "../../hooks/queries";
import { useLogoutMutation } from "../../hooks/mutations";
import { useQueryClient } from "react-query";

export const NavBar: React.FC = () => {
  const { me } = useMeQuery();
  const { isLoading, mutateAsync } = useLogoutMutation();
  const queryClient = useQueryClient();

  const logout = async () => {
    await mutateAsync(
      {},
      {
        onSuccess: () => {
          queryClient.resetQueries();
        }
      }
    );
  };

  return (
    <Box py={4} bg="gray.50">
      <Container>
        <Stack align="center" direction="row" justify="space-between">
          <Stack align="center" direction="row" spacing={32}>
            <Link text="Home" href="/" fontSize="2xl" />
            <Stack align="center" direction="row">
              {me && <Link text="Profile" href="/profile" fontSize="xl" />}
            </Stack>
          </Stack>
          <Stack align="center" direction="row" spacing={8}>
            {!me ? (
              <>
                <Link text="Login" href="/login" fontSize="xl" />
                <NextLink href="/register">
                  <Button colorScheme="blue">Register</Button>
                </NextLink>
              </>
            ) : (
              me && (
                <NextLink href="#">
                  <Button
                    colorScheme="blue"
                    onClick={logout}
                    isLoading={isLoading}
                  >
                    Logout
                  </Button>
                </NextLink>
              )
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
