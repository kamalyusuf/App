import React from "react";
import { ITeam } from "@app/water";
import { ListItem, ListIcon, Link } from "@chakra-ui/react";
import { AiOutlineTeam } from "react-icons/ai";
import NextLink from "next/link";
import { capitalize } from "lodash";

interface Props {
  team: ITeam;
}

export const Team: React.FC<Props> = ({ team }) => {
  return (
    <>
      <NextLink
        href={{
          pathname: "/teams/[id]",
          query: {
            id: team.id
          }
        }}
      >
        <ListItem fontSize="lg">
          <ListIcon as={AiOutlineTeam} color="blue.300" />
          <Link>{capitalize(team.name)}</Link>
        </ListItem>
      </NextLink>
    </>
  );
};
