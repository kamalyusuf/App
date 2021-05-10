import { NextPage } from "next";
import React from "react";
import { Container } from "../../components/Container";
import { NavBarLayout } from "../../components/Layouts";
import { CardHeader, LoadingSpinner } from "../../components/UI";
import { useTeamsQuery } from "../../hooks";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Team } from "../../components/Team";
import { AddIcon } from "@chakra-ui/icons";
import { CreateTeamModal } from "../../components/Modals";

const Teams: NextPage = () => {
  const { data, loading } = useTeamsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isOpen && <CreateTeamModal isOpen={isOpen} onClose={onClose} />}
      <NavBarLayout>
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
            data?.docs.map((team) => <Team key={team.id} team={team} />)
          )}
        </Container>
      </NavBarLayout>
    </>
  );
};

export default Teams;
