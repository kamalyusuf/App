import React from "react";
import { IInvite } from "@app/water";
import {
  Box,
  Stack,
  Icon,
  Heading,
  Badge,
  Button,
  Text
} from "@chakra-ui/react";
import { BiEnvelope } from "react-icons/bi";

interface Props {
  invite: IInvite;
}

export const Invite: React.FC<Props> = ({ invite }) => {
  return (
    <Stack direction="row" justify="space-between" align="center">
      <Stack direction="row" align="center">
        <Stack direction="row" align="normal">
          <Icon as={BiEnvelope} color="blue.300" boxSize={6} />
          <Stack>
            <Stack direction="row" spacing={3}>
              <Heading as="h3" size="md">
                Team: {invite.team.name}
              </Heading>
              <Badge
                colorScheme="blue"
                sx={{
                  display: "grid",
                  placeItems: "center"
                }}
              >
                {invite.status}
              </Badge>
            </Stack>
            <Text>Invited by {invite.invited_by.email}</Text>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row" align="center" spacing={3}>
        <Box>
          <Button colorScheme="red">Reject</Button>
        </Box>
        <Box>
          <Button colorScheme="blue">Accept</Button>
        </Box>
      </Stack>
    </Stack>
  );
};
