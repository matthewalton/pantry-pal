"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: ReactNode }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <>
      <SessionProvider>
        <SlideInPanelContext.Provider
          value={{ isPanelOpen, openPanel, closePanel }}
        >
          {children}
        </SlideInPanelContext.Provider>
      </SessionProvider>
    </>
  );
}

const SlideInPanelContext = createContext({
  isPanelOpen: false,
  openPanel: () => {},
  closePanel: () => {},
});

export const useSignInPanel = () => {
  return useContext(SlideInPanelContext);
};
