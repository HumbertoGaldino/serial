import Header from "@/src/components/Header/Header";
import AsideMenu from "@/src/components/AsideMenu/AsideMenu";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row">
      <AsideMenu />

      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
      </div>
    </div>
  );
}
