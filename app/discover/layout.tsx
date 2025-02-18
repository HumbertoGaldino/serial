import Header from "@/src/components/Header/Header";
import AsideMenu from "@/src/components/AsideMenu/AsideMenu";
import Footer from "@/src/components/Footer/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover page",
};

export default function DiscoverLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row">
      <AsideMenu />

      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
