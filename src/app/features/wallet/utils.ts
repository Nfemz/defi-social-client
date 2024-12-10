"use client";

export const setWalletInfo = (walletInfo: JSON) => {
  localStorage.setItem("walletInfo", JSON.stringify(walletInfo));
};

export const getWalletInfo = () => {
  const walletInfo = localStorage.getItem("walletInfo");
  return walletInfo ? JSON.parse(walletInfo) : null;
};
