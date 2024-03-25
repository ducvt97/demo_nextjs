import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@/assets/styles/css/globals.css";
import "@/assets/styles/css/reset.css";
import "@/assets/styles/css/normalize.css";
import "@/assets/styles/scss/tailwind-common.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import AuthProvider from "@/components/common/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Property Manager",
  description: "Best way to manage your properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
