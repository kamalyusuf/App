import React, { useRef } from "react";
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
  Button
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useCreateTeamMutation } from "../../hooks";
import { QueryObserverResult } from "react-query";
import { IPaginatedResponse, ITeam } from "@app/water";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => Promise<QueryObserverResult<IPaginatedResponse<ITeam>>>;
}

export const CreateTeamModal: React.FC<Props> = ({
  isOpen,
  onClose,
  refetch
}) => {
  const initialFocusRef = useRef(null);
  const { mutateAsync } = useCreateTeamMutation();

  return (
    <Portal>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name: "" }}
              onSubmit={async (values) => {
                await mutateAsync(values, {
                  onSuccess: () => {
                    refetch();
                    onClose();
                  }
                });
              }}
            >
              {({ isSubmitting, values: { name } }) => (
                <Form style={{ paddingBottom: "0.75em" }}>
                  <Field name="name">
                    {({ field }: FieldProps) => (
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} type="text" ref={initialFocusRef} />
                      </FormControl>
                    )}
                  </Field>
                  <br />
                  <Button
                    colorScheme="blue"
                    type="submit"
                    disabled={isSubmitting || name.trim().length < 5}
                  >
                    Create Team
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Portal>
  );
};
