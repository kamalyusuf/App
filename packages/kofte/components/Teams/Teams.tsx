import { AddIcon } from "@chakra-ui/icons";
import { IconButton, useDisclosure, List } from "@chakra-ui/react";
import React from "react";
import { useTeamsQuery } from "../../hooks";
import { Container } from "../Container";
import { CreateTeamModal } from "../Modals";
import { CardHeader, LoadingSpinner } from "../UI";
import { Team } from "./Team";

export const Teams: React.FC = () => {
  const { data, loading, refetch } = useTeamsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isOpen && (
        <CreateTeamModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      )}
      <Container>
        <CardHeader
          title="Teams"
          p={false}
          action={
            <IconButton
              aria-label="Create team"
              icon={<AddIcon />}
              onClick={onOpen}
              _active={{
                outline: "none"
              }}
              _focus={{
                outline: "none"
              }}
            />
          }
        />
        <br />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <List spacing={3}>
            {data?.docs.map((team) => (
              <Team key={team.id} team={team} />
            ))}
          </List>
        )}
      </Container>
    </>
  );
};
