import { Box, Stack, Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "../UI";
import NextLink from "next/link";
import { Container } from "../Container";
import { useQueryClient } from "react-query";
import { useLogoutMutation, useMeQuery } from "../../hooks";
import { useRouter } from "next/router";
import { SocketContext } from "../../modules/socket";

export const NavBar: React.FC = () => {
  const { me } = useMeQuery();
  const { isLoading, mutateAsync } = useLogoutMutation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { socket, setSocket } = useContext(SocketContext);

  const logout = async () => {
    await mutateAsync(
      {},
      {
        onSuccess: () => {
          queryClient.resetQueries();
          socket?.disconnect();
          setSocket(null);
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
                <Stack align="center" direction="row" spacing="16">
                  <Stack
                    align="center"
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: "3", md: "8" }}
                  >
                    <Box>
                      <Link text="Account" href="/account" fontSize="xl" />
                    </Box>

                    <Box>
                      <Link text="Teams" href="/teams" fontSize="xl" />
                    </Box>

                    <Box>
                      <Link text="Invites" href="/invites" fontSize="xl" />
                    </Box>
                  </Stack>

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
