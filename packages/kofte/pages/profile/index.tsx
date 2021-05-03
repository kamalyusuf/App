import { NextPage } from "next";
import React from "react";
import { Container } from "../../components/Container";
import { NavBarLayout } from "../../components/Layouts";
import { useMeQuery } from "../../hooks/queries";

const Profile: NextPage = () => {
  const { me } = useMeQuery();

  return (
    <NavBarLayout>
      <Container>
        <div>{JSON.stringify(me, null, 4)}</div>
      </Container>
    </NavBarLayout>
  );
};

export default Profile;
