import React from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}

export const ConnectAccountButton: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Connect
      </Button>
    </>
  );
};
