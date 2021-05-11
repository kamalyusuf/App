import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { NavBarLayout } from "../../components/Layouts";
import { Invites } from "../../components/Invites";
import { WaitForEmailVerified } from "../../components/Auth/WaitForEmailVerified";
import { withAuth } from "../../hocs/withAuth";
import { useInvitesQuery } from "../../hooks";
import { LoadingSpinner } from "../../components/UI";

const InvitesPage: NextPage = () => {
  const { invites, loading } = useInvitesQuery();

  return (
    <>
      <Head>
        <title>App | Invites</title>
      </Head>
      <NavBarLayout>
        <WaitForEmailVerified>
          {loading ? (
            <LoadingSpinner />
          ) : (
            invites?.length && <Invites invites={invites} />
          )}
        </WaitForEmailVerified>
      </NavBarLayout>
    </>
  );
};

export default withAuth(InvitesPage);
