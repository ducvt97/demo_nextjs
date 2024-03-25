"use client";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
