import React from "react";
import { ITeamMember } from "@app/water";
import { ListItem, ListIcon } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { FaCrown } from "react-icons/fa";

interface Props {
  member: ITeamMember;
  teamOwnerId: string;
}

export const TeamMember: React.FC<Props> = ({ member, teamOwnerId }) => {
  return (
    <ListItem sx={{ display: "flex", alignItems: "center" }}>
      <ListIcon
        as={teamOwnerId === member.user.id ? FaCrown : AiOutlineUser}
        color="blue.300"
        sx={{ display: "flex", alignItems: "center" }}
      />
      {member.user.email}
    </ListItem>
  );
};
