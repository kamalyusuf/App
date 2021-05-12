import React from "react";
import { ITeam, IUser } from "@app/water";
import { ListItem, ListIcon, Link } from "@chakra-ui/react";
import { AiOutlineTeam } from "react-icons/ai";
import NextLink from "next/link";
import { capitalize } from "lodash";
import { useMeQuery } from "../../hooks";
import { GiLaurelCrown } from "react-icons/gi";

interface Props {
  team: ITeam;
}

export const Team: React.FC<Props> = ({ team }) => {
  const { me } = useMeQuery();
  const isTeamOwner = (team.owner as IUser).id === me?.id;

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
        <ListItem fontSize="lg" sx={{ display: "flex", alignItems: "center" }}>
          <ListIcon
            as={isTeamOwner ? GiLaurelCrown : AiOutlineTeam}
            color="blue.300"
            sx={{ display: "flex", alignItems: "center" }}
          />
          <Link>{capitalize(team.name)}</Link>
        </ListItem>
      </NextLink>
    </>
  );
};
