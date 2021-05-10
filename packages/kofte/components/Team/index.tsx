import React from "react";
import { ITeam } from "@app/water";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  team: ITeam;
}

export const Team: React.FC<Props> = ({ team }) => {
  return (
    <Box>
      <Text>{team.name}</Text>
    </Box>
  );
};
