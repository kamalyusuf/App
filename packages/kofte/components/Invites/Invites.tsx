import React from "react";
import { Stack } from "@chakra-ui/react";
import { IInvite } from "@app/water";
import { Invite } from "./Invite";
import { Container } from "../Container";
import { CardHeader } from "../UI";

interface Props {
  invites: IInvite[];
}

export const Invites: React.FC<Props> = ({ invites }) => {
  return (
    <Container>
      <Stack spacing={3}>
        <CardHeader title="Invites" p={false} />
        <Stack spacing={6}>
          {invites.map((invite) => (
            <Invite key={invite.id} invite={invite} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
