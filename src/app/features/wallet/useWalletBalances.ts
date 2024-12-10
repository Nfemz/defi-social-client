"use client";

import { useQuery } from "@tanstack/react-query";
import { getWalletInfo } from "./utils";
import { useMemo, useState } from "react";

const getBalances = async () => {
  try {
    const walletInfo = getWalletInfo();
    if (!walletInfo) return null;

    // Transform walletInfo to only include chain -> publicKey mapping
    const publicKeysByChain = Object.entries(walletInfo).reduce(
      (acc, [chain, { publicKey }]) => ({
        ...acc,
        [chain]: publicKey,
      }),
      {} as Record<string, string>
    );

    const response = await fetch(`http://localhost:3001/wallet/balances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publicKeysByChain),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wallet balances");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching wallet balances", error);
    throw error;
  }
};

export const useWalletBalances = () => {
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["walletBalances"],
    enabled,
    queryFn: getBalances,
  });

  return {
    data,
    isLoading,
    isError,
    fetchBalances: () => setEnabled(true),
  };
};
