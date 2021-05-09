import { Box, Icon } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useState } from "react";
import { NavBarLayout } from "../../components/Layouts";
import {
  Card,
  CardProperty,
  CardHeader,
  CardContent,
  LoadingSpinner
} from "../../components/UI";
import { withAuth } from "../../hocs/withAuth";
import { useAccountQuery, useUnlinkProviderMutation } from "../../hooks";
import { MdVerifiedUser, MdCancel } from "react-icons/md";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import { ConnectAccountButton } from "../../components/ConnectAccountButton";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IUser, IAccount } from "@app/water";
import { useQueryClient } from "react-query";

const Providers = [
  {
    label: "Google",
    value: "google_id",
    icon: FcGoogle,
    link: `${process.env.NEXT_PUBLIC_API_URL}/api/account/link/google`
  },
  {
    label: "Github",
    value: "github_id",
    icon: FaGithub,
    link: `${process.env.NEXT_PUBLIC_API_URL}/api/account/link/github`
  }
];

const Account: NextPage = () => {
  const { account, loading: isLoadingAccount } = useAccountQuery();
  const { mutateAsync } = useUnlinkProviderMutation();
  const [unlinking, setUnlinking] = useState<string>("");
  const queryClient = useQueryClient();

  if (isLoadingAccount) {
    return <LoadingSpinner />;
  }

  if (!account) return null;

  return (
    <>
      <Head>
        <title>App | Account</title>
      </Head>
      <NavBarLayout>
        <Box as="section" py="12" px={{ md: "8" }} h="100%">
          <Card maxW="3xl" mx="auto">
            <CardHeader title="Account" />
            <CardContent>
              <CardProperty
                label="Email"
                value={(account.user as IUser).email}
              />
              <CardProperty
                label="Verified"
                value={
                  <Icon
                    as={
                      (account.user as IUser).email_verified
                        ? MdVerifiedUser
                        : MdCancel
                    }
                  />
                }
              />
              <CardProperty
                label="Member Since"
                value={format(
                  parseISO((account.user as IUser).created_at),
                  "do MMMM, yyyy"
                )}
              />
            </CardContent>
            <br />
            <CardHeader title="Connected accounts" />
            <CardContent>
              {Providers.map((provider) => (
                <CardProperty
                  key={provider.label}
                  label={provider.label}
                  value={
                    (account as any)[provider.value] ? (
                      <Icon as={MdVerifiedUser} />
                    ) : (
                      <ConnectAccountButton
                        onClick={() => {
                          window.open(provider.link, "_self");
                        }}
                      />
                    )
                  }
                  icon={provider.icon}
                  isLoading={unlinking === provider.label}
                  revokeConnection={
                    (account as any)[provider.value]
                      ? async () => {
                          setUnlinking(provider.label);
                          await mutateAsync(
                            { provider: provider.label.toLowerCase() },
                            {
                              onSuccess: (data) => {
                                queryClient.setQueryData<IAccount>(
                                  "/account",
                                  (account) => {
                                    return data;
                                  }
                                );
                              }
                            }
                          );
                          setUnlinking("");
                        }
                      : undefined
                  }
                />
              ))}
            </CardContent>
          </Card>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default withAuth(Account);
