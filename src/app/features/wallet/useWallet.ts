"use client";

import { useState, useEffect } from "react";
import { getWalletInfo, WalletInfo } from "./utils";
import { useCreateWallet } from "./useCreateWallet";

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const {
    mutate: createWallet,
    isPending: isCreatingWallet,
    data: walletData,
    reset: resetWalletData,
  } = useCreateWallet();

  useEffect(() => {
    // Only try to get wallet info after component mounts
    const savedWallet = getWalletInfo();
    setWallet(savedWallet);
    setIsInitializing(false);
  }, []);

  return {
    wallet: wallet || walletData,
    loading: isCreatingWallet,
    disconnecting: isDisconnecting,
    initializing: isInitializing,
    createWallet: () => createWallet(),
    disconnectWallet: () => {
      setIsDisconnecting(true);
      localStorage.removeItem("walletInfo");
      setWallet(null);
      resetWalletData(); // Reset the mutation data
      setIsDisconnecting(false);
    },
  };
};
