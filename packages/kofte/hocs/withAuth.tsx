import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { useMeQuery } from "../hooks";

export const withAuth = <T extends {}>(Component: NextPage<T>) => (
  props: any
) => {
  const { me, loading } = useMeQuery();
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!loading && !me) {
    router.replace(`/login?redirect=${router.asPath}`);
    return null;
  }

  return <Component {...props} />;
};
