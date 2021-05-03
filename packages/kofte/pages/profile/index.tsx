import { NextPage } from "next";
import React from "react";
import { Container } from "../../components/Container";
import { NavBarLayout } from "../../components/Layouts";
import { withAuth } from "../../hocs/withAuth";
import { useMeQuery } from "../../hooks";

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

export default withAuth(Profile);
