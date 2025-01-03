"use client";

export const setWalletInfo = (walletInfo: JSON) => {
  localStorage.setItem("walletInfo", JSON.stringify(walletInfo));
};

export type WalletInfo = Record<
  string,
  { publicKey: string; privateKey: string }
>;

export const getWalletInfo = (): WalletInfo | null => {
  const walletInfo = localStorage.getItem("walletInfo");
  return walletInfo ? JSON.parse(walletInfo) : null;
};
