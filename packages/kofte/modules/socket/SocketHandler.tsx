import { IInvite } from "@app/water";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useSocket } from "../../hooks";
import { notify } from "../../utils";

export const SocketHandler: React.FC = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!socket) return;

    socket.on("invite:new", ({ invite }: { invite: IInvite }) => {
      notify({
        title: invite.invited_by.email,
        body: `Invited you to join Team ${invite.team.name}`,
        onClick: () => {
          router.push("/invites");
        }
      });

      queryClient.setQueryData<IInvite[] | undefined>("/invites", (invites) => {
        if (!invites) return;
        return [invite, ...invites];
      });
    });

    socket.on("invite:accept", ({ invite }: { invite: IInvite }) => {
      toast({
        description: `${invite.invite_to_email} accepted your invitation`,
        status: "info",
        duration: 3000,
        position: "top",
        isClosable: true
      });
      queryClient.invalidateQueries(`/teams/${invite.team.id}/team-members`);
    });

    return () => {
      socket.off("invite:new");
      socket.off("invite:accept");
    };
  }, [socket]);

  return null;
};
