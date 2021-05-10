import React from "react";
import { ITeamMember } from "@app/water";
import { List } from "@chakra-ui/react";
import { TeamMember } from "./TeamMember";

interface Props {
  members: ITeamMember[];
}

export const TeamMembers: React.FC<Props> = ({ members }) => {
  return (
    <List>
      {members.map((member) => (
        <TeamMember member={member} />
      ))}
    </List>
  );
};
