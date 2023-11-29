import Query from "@/Query";
import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/AuthProvider";
import "./globals.css";
import "./theme-config.css";
import RadixUiProvider from "@/RadixUiProvider";

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
    <html lang="en">
      <body className={inter.variable}>
        <Query>
          <AuthProvider>
            <RadixUiProvider>
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </RadixUiProvider>
          </AuthProvider>
        </Query>
      </body>
    </html>
  );
}
