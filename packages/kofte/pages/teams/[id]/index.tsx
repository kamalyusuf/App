import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { WaitForEmailVerified } from "../../../components/Auth/WaitForEmailVerified";
import { Container } from "../../../components/Container";
import { NavBarLayout } from "../../../components/Layouts";
import { LoadingSpinner, CardHeader } from "../../../components/UI";
import { useTeamQuery, useTeamMembersQuery } from "../../../hooks";
import { Box, Text, Stack, Button, useDisclosure } from "@chakra-ui/react";
import { capitalize } from "lodash";
import { TeamMembers } from "../../../components/TeamMembers";
import { InviteUserToTeamModal } from "../../../components/Modals";

const TeamPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { team, loading } = useTeamQuery(id);
  const { members, loading: isLoadingMembers } = useTeamMembersQuery(id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) return <LoadingSpinner />;

  if (!team) return null;

  return (
    <>
      <Head>
        <title>App | Team</title>
      </Head>
      {isOpen && <InviteUserToTeamModal isOpen={isOpen} onClose={onClose} />}
      <NavBarLayout>
        <WaitForEmailVerified>
          <Container>
            <Stack spacing={3}>
              <CardHeader
                title={capitalize(team.name)}
                p={false}
                action={
                  <Box>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      variant="outline"
                      onClick={onOpen}
                    >
                      Invite
                    </Button>
                  </Box>
                }
              />
              <Stack>
                <Box>
                  <Text fontSize="xl">Members</Text>
                </Box>
                <Box>
                  {isLoadingMembers ? (
                    <LoadingSpinner centered={false} />
                  ) : (
                    members?.length && <TeamMembers members={members} />
                  )}
                </Box>
              </Stack>
            </Stack>
          </Container>
        </WaitForEmailVerified>
      </NavBarLayout>
    </>
  );
};

export default TeamPage;
