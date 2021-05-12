import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { WaitForEmailVerified } from "../../../modules/auth";
import {
  Container,
  NavBarLayout,
  LoadingSpinner,
  CardHeader
} from "../../../components";
import { useTeamQuery, useTeamMembersQuery, useMeQuery } from "../../../hooks";
import { Box, Text, Stack, Button, useDisclosure } from "@chakra-ui/react";
import { capitalize } from "lodash";
import { TeamMembers } from "../../../modules/team-members";
import { InviteUserToTeamModal } from "../../../modules/invites";
import { withAuth } from "../../../hocs/withAuth";
import { isTeamOwner, hasPermission } from "../../../lib";

const TeamPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { team, loading } = useTeamQuery(id);
  const { members, loading: isLoadingMembers } = useTeamMembersQuery(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { me } = useMeQuery();

  if (loading) return <LoadingSpinner />;

  if (!team || !members) return null;

  const meAsMember = members.find((member) => member.user.id === me?.id);

  const InviteMemberButton =
    isTeamOwner(meAsMember) || hasPermission(meAsMember) ? (
      <Box>
        <Button colorScheme="blue" size="sm" variant="outline" onClick={onOpen}>
          Invite
        </Button>
      </Box>
    ) : undefined;

  return (
    <>
      <Head>
        <title>App | Team</title>
      </Head>
      {isOpen && (
        <InviteUserToTeamModal isOpen={isOpen} onClose={onClose} team={team} />
      )}
      <NavBarLayout>
        <WaitForEmailVerified>
          <Container>
            <Stack spacing={3}>
              <CardHeader
                title={capitalize(team.name)}
                p={false}
                action={InviteMemberButton}
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

export default withAuth(TeamPage);
