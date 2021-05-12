import React from "react";
import { ITeamMember } from "@app/water";
import { ListItem, ListIcon } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

interface Props {
  member: ITeamMember;
}

export const TeamMember: React.FC<Props> = ({ member }) => {
  return (
    <ListItem>
      <ListIcon as={AiOutlineUser} color="blue.300" />
      {member.user.email}
    </ListItem>
  );
};
