import React from "react";
import { Stack } from "@chakra-ui/react";
import { Invite } from "./Invite";
import { Container } from "../Container";
import { CardHeader, LoadingSpinner } from "../UI";
import { useInvitesQuery } from "../../hooks";

export const Invites: React.FC = () => {
  const { invites, loading } = useInvitesQuery();

  return (
    <Container>
      <Stack spacing={3}>
        <CardHeader title="Invites" p={false} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Stack spacing={6}>
            {invites?.length &&
              invites.map((invite) => (
                <Invite key={invite.id} invite={invite} />
              ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};
