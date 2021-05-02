import React, { useEffect } from "react";
import { useToastStore } from "../../hooks";
import { useToast } from "@chakra-ui/react";

export const ErrorToast: React.FC = () => {
  const toast = useToast();
  const { toasts, clear } = useToastStore();

  useEffect(() => {
    if (!toasts.length) return;

    toast({
      title: toasts[0].message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top-right",
      onCloseComplete: () => {
        clear(toasts[0].id);
      }
    });
    // toasts.forEach((t) => {
    //   toast({
    //     title: t.message,
    //     status: "error",
    //     duration: 2000,
    //     isClosable: true,
    //     position: "top-right",
    //     onCloseComplete: () => {
    //       clear(t.id);
    //     }
    //   });
    // });
  }, [toasts]);

  return null;
};
