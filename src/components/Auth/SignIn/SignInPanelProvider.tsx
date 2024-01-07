"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

const SlideInPanelContext = createContext({
  isPanelOpen: false,
  openPanel: () => {},
  closePanel: () => {},
});

export const SignInPanelProvider = ({ children }: { children: ReactNode }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <SlideInPanelContext.Provider
      value={{ isPanelOpen, openPanel, closePanel }}
    >
      {children}
    </SlideInPanelContext.Provider>
  );
};

export const useSignInPanel = () => {
  return useContext(SlideInPanelContext);
};
