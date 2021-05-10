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
  ModalFooter
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteUserToTeamModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const initialFocusRef = useRef(null);

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
            initialValues={{ email: "" }}
            onSubmit={(values) => {
              console.log("submitted", values);
            }}
          >
            {({ isSubmitting, values: { email } }) => (
              <>
                <ModalBody>
                  <Form id="invite-user-to-team-form">
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
                    disabled={isSubmitting || !email}
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
