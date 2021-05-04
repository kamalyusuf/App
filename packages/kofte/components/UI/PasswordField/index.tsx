import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useColorModeValue as mode
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import NextLink from "next/link";
import { useField, ErrorMessage } from "formik";
import { InputErrorMessage } from "../InputErrorMessage";

interface Props {
  showForgotPassword?: boolean;
}

export const PasswordField: React.FC<Props> = ({ showForgotPassword }) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const [field] = useField("password");

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  return (
    <FormControl id="password">
      <Flex justify="space-between">
        <FormLabel>Password</FormLabel>
        {showForgotPassword && (
          <NextLink href="/login/forgot">
            <Box
              as="a"
              color={mode("blue.600", "blue.200")}
              fontWeight="semibold"
              fontSize="sm"
              style={{ cursor: "pointer" }}
              _hover={{ textDecoration: "underline" }}
            >
              Forgot Password?
            </Box>
          </NextLink>
        )}
      </Flex>
      <InputGroup>
        <InputRightElement>
          <IconButton
            bg="transparent !important"
            variant="ghost"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id={field.name}
          {...field}
          ref={inputRef}
          type={isOpen ? "text" : "password"}
          // required
        />
      </InputGroup>
      <ErrorMessage name="password" component={InputErrorMessage} />
    </FormControl>
  );
};

PasswordField.defaultProps = {
  showForgotPassword: true
};
