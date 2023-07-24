"use client"
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [showNavModal, setShowNavModal] = useState(false)
  const [commonLoader, setCommonLoader] = useState(false)

  return <GlobalContext.Provider value={{showNavModal, setShowNavModal, commonLoader, setCommonLoader}}>{children}</GlobalContext.Provider>;
};

export default GlobalState;