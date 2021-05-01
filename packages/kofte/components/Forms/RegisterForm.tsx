import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PasswordField } from "../UI";
import { ICredentials } from "@app/water";

interface Props {
  onSubmit: (credentials: ICredentials) => void;
}

export const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email, password });
      }}
    >
      <Stack>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </FormControl>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Create my account
        </Button>
      </Stack>
    </chakra.form>
  );
};
