import { Box, Icon } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { NavBarLayout } from "../../components/Layouts";
import {
  Card,
  CardProperty,
  CardHeader,
  CardContent
} from "../../components/UI";
import { withAuth } from "../../hocs/withAuth";
import { useMeQuery } from "../../hooks";
import { MdVerifiedUser, MdCancel } from "react-icons/md";
import { format, parseISO } from "date-fns";

const Account: NextPage = () => {
  const { me } = useMeQuery();

  if (!me) return null;

  return (
    <NavBarLayout>
      <Box as="section" py="12" px={{ md: "8" }} h="100%">
        <Card maxW="3xl" mx="auto">
          <CardHeader title="Account" />
          <CardContent>
            <CardProperty label="Email" value={me.email} />
            <CardProperty
              label="Verified"
              value={
                <Icon as={me.email_verified ? MdVerifiedUser : MdCancel} />
              }
            />
            <CardProperty
              label="Member Since"
              value={format(parseISO(me.created_at), "do MMMM, yyyy")}
            />
          </CardContent>
        </Card>
      </Box>
    </NavBarLayout>
  );
};

export default withAuth(Account);
