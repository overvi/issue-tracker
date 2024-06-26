import DarkModeProvider from "@/DarkModeProvider";
import Query from "@/Query";
import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import NavBar from "./NavBar";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "./theme-config.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html className="dark" lang="en">
        <body className={inter.variable}>
          <Query>
            <DarkModeProvider>
              <Theme accentColor="violet" className="min-h-screen">
                <NavBar />
                <main className="p-5">
                  <Container>{children}</Container>
                </main>
              </Theme>
            </DarkModeProvider>
          </Query>
        </body>
      </html>
    </ClerkProvider>
  );
}
