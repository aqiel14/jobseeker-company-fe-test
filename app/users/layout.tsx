"use client";

import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { SiteHeader } from "@/components/SiteHeader";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex flex-1 flex-col p-4">
        <AppBreadcrumb />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
