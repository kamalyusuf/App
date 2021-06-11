import { IInvite } from "@app/water";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useSocket } from "../../hooks";
import { notify } from "../../utils";

export const SocketHandler: React.FC = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const router = useRouter();

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

    return () => {
      socket.off("invite:new");
    };
  }, [socket]);

  return null;
};
