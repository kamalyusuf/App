import { Box, Stack, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "../UI";
import NextLink from "next/link";
import { Container } from "../Container";
import { useQueryClient } from "react-query";
import { useLogoutMutation, useMeQuery } from "../../hooks";
import { useRouter } from "next/router";

export const NavBar: React.FC = () => {
  const { me } = useMeQuery();
  const { isLoading, mutateAsync } = useLogoutMutation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = async () => {
    await mutateAsync(
      {},
      {
        onSuccess: () => {
          queryClient.resetQueries();
          router.replace("/");
        }
      }
    );
  };

  return (
    <Box py={4} bg="gray.50">
      <Container>
        <Stack
          align="center"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          spacing={{ base: "3" }}
        >
          <Stack
            align="center"
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "3", md: "32" }}
          >
            <Box>
              <Link text="App" href="/" fontSize="xl" />
            </Box>
          </Stack>
          <Stack align="center" direction={{ base: "column", md: "row" }}>
            {!me ? (
              <>
                <Link text="Login" href="/login" fontSize="xl" />
                <NextLink href="/register">
                  <Button colorScheme="blue">Register</Button>
                </NextLink>
              </>
            ) : (
              me && (
                <Stack
                  align="center"
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: "3", md: "32" }}
                >
                  <Box>
                    <Link text="Account" href="/account" fontSize="xl" />
                  </Box>

                  <Box>
                    <Button
                      colorScheme="blue"
                      onClick={logout}
                      isLoading={isLoading}
                    >
                      Logout
                    </Button>
                  </Box>
                </Stack>
              )
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
