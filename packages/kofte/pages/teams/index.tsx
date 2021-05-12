import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { NavBarLayout } from "../../components";
import { WaitForEmailVerified } from "../../modules/auth";
import { Teams } from "../../modules/teams";
import { withAuth } from "../../hocs/withAuth";

const TeamsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>App | Teams</title>
      </Head>
      <NavBarLayout>
        <WaitForEmailVerified>
          <Teams />
        </WaitForEmailVerified>
      </NavBarLayout>
    </>
  );
};

export default withAuth(TeamsPage);
