import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { NavBarLayout } from "../../components/Layouts";
import { WaitForEmailVerified } from "../../modules/auth";
import { withAuth } from "../../hocs/withAuth";
import { Invites } from "../../modules/invites";

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
