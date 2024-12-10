"use client";

import { useMutation } from "@tanstack/react-query";
import { setWalletInfo } from "./utils";

export const useCreateWallet = () => {
  const createWallet = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3001/wallet/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create wallet");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setWalletInfo(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return createWallet;
};
