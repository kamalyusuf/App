import React, { useRef } from "react";
import { Formik, Field, Form, FieldProps } from "formik";
import {
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Stack,
  Flex,
  Text,
  useToast
} from "@chakra-ui/react";
import { useMeQuery, useTeamInvitationMutation } from "../../hooks";
import { TeamPermissions, ITeam } from "@app/water";

interface Props {
  team: ITeam;
  isOpen: boolean;
  onClose: () => void;
}

export const InviteUserToTeamModal: React.FC<Props> = ({
  team,
  isOpen,
  onClose
}) => {
  const initialFocusRef = useRef(null);
  const { mutateAsync } = useTeamInvitationMutation();
  const toast = useToast();
  const { me } = useMeQuery();

  return (
    <Portal>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite Member</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ email: "", permissions: [] as TeamPermissions[] }}
            onSubmit={async ({ email, permissions }) => {
              await mutateAsync(
                {
                  team_id: team.id,
                  invite_to_email: email,
                  permissions
                },
                {
                  onSuccess: () => {
                    toast({
                      description: `Invitation sent to ${email}`,
                      status: "success",
                      duration: 3000,
                      isClosable: true
                    });
                    onClose();
                  }
                }
              );
            }}
          >
            {({ isSubmitting, values: { email } }) => (
              <>
                <ModalBody>
                  <Form
                    id="invite-user-to-team-form"
                    style={{ display: "grid", gap: "1em" }}
                  >
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <FormControl>
                          <FormLabel>Email</FormLabel>
                          <Input
                            {...field}
                            type="email"
                            ref={initialFocusRef}
                          />
                        </FormControl>
                      )}
                    </Field>

                    <FormControl>
                      <FormLabel>Permissions</FormLabel>
                      <Stack spacing={2}>
                        <Flex justify="space-between" align="center">
                          <Text>Can Invite</Text>
                          <Field
                            type="checkbox"
                            name="permissions"
                            value="can:invite"
                          />
                        </Flex>
                      </Stack>
                    </FormControl>
                  </Form>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    form="invite-user-to-team-form"
                    disabled={isSubmitting || !email || me?.email === email}
                  >
                    Invite
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </Portal>
  );
};
