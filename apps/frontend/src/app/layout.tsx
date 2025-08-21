import type { Metadata } from "next";
import {
  Aside,
  Divider,
  Header,
  IconInitializer,
  Noise,
  Signature,
} from "@/components";
import { SearchProvider } from "@/context/SearchContext";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Challenge Software Engineer Thmanyah Front-end — Yahia Refaiea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <IconInitializer />
          <Noise />

          <div id="container">
            <Signature />
            <Aside />

            <Divider orientation="vertical" className="hidden lg:block" />
            <Divider orientation="horizontal" className="block lg:hidden" />

            <div>
              <Header />
              <main>{children}</main>
            </div>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
