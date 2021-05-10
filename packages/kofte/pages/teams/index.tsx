import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { NavBarLayout } from "../../components/Layouts";
import { WaitForEmailVerified } from "../../components/Auth/WaitForEmailVerified";
import { Teams } from "../../components/Teams";

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

export default TeamsPage;
