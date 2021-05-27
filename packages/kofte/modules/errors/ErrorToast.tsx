import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useToastStore } from "../../store";

export const ErrorToast: React.FC = () => {
  const toast = useToast();
  const { toasts, clear } = useToastStore();

  useEffect(() => {
    toasts.forEach((t) => {
      toast({
        title: t.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        onCloseComplete: () => {
          clear(t.id);
        }
      });
    });
  }, [toasts]);

  return null;
};
