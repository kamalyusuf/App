import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { NavBarLayout } from "../../components/Layouts";
import { Invites } from "../../components/Invites";
import { WaitForEmailVerified } from "../../components/Auth/WaitForEmailVerified";
import { withAuth } from "../../hocs/withAuth";

const InvitesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>App | Invites</title>
      </Head>
      <NavBarLayout>
        <WaitForEmailVerified>
          <Invites />
        </WaitForEmailVerified>
      </NavBarLayout>
    </>
  );
};

export default withAuth(InvitesPage);
