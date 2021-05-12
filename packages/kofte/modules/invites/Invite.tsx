import React from "react";
import { IInvitationStatuses, IInvite } from "@app/water";
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
import { useAcceptTeamInvitationMutation } from "../../hooks";
import { useQueryClient } from "react-query";

interface Props {
  invite: IInvite;
}

const badgeColor = (status: IInvitationStatuses) => {
  switch (status) {
    case "pending":
      return "yellow";
    case "accepted":
      return "green";
    case "rejected":
      return "red";
    case "revoked":
      return "red";
    default:
      return "gray";
  }
};

export const Invite: React.FC<Props> = ({ invite }) => {
  const { mutateAsync, isLoading } = useAcceptTeamInvitationMutation();
  const queryClient = useQueryClient();

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
                colorScheme={badgeColor(invite.status)}
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

      {invite.status === "pending" && (
        <Stack direction="row" align="center" spacing={3}>
          <Box>
            <Button colorScheme="red">Reject</Button>
          </Box>
          <Box>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={async () => {
                await mutateAsync(
                  { invite_id: invite.id },
                  {
                    onSuccess: (data) => {
                      queryClient.invalidateQueries("/teams");
                      queryClient.setQueryData<IInvite[] | undefined>(
                        "/invites",
                        (invites) => {
                          if (invites) {
                            return invites.map((invite) => {
                              if (invite.id === data.id) {
                                return data;
                              }
                              return invite;
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }}
            >
              Accept
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};
