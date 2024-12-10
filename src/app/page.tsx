"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useWallet } from "./features/wallet/useWallet";
import { Button } from "./components/Button";
import { useMemo, useState } from "react";
import { Modal } from "./components/Modal";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const HomeContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    wallet,
    loading,
    initializing,
    disconnecting,
    createWallet,
    disconnectWallet,
  } = useWallet();

  const openWallet = () => {
    setIsModalOpen(true);
  };

  const walletButtonText = useMemo(() => {
    if (initializing) return "Fetching Wallet";
    if (loading) return "Creating Wallet";
    return wallet ? "Open Wallet" : "Create Wallet";
  }, [initializing, loading, wallet]);

  return (
    <div className="flex items-center justify-center gap-4 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Button
        onClick={() => (wallet ? openWallet() : createWallet())}
        disabled={loading || initializing}
        isLoading={loading || initializing}
      >
        {walletButtonText}
      </Button>

      {wallet && (
        <Button
          onClick={() => disconnectWallet()}
          disabled={disconnecting}
          isLoading={disconnecting}
          variant="danger"
        >
          Disconnect Wallet
        </Button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Hello World</p>
      </Modal>
    </div>
  );
};
