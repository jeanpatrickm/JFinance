"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/sidebar-nav";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <header
        className={cn(
          "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border",
          "bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80",
          "lg:hidden",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-expanded={mobileNavOpen}
          aria-controls="app-sidebar"
          aria-label="Abrir menu de navegação"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <span className="truncate text-base font-semibold text-foreground">
          JFinance
        </span>
      </header>

      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
          aria-label="Fechar menu"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <SidebarNav
        mobileOpen={mobileNavOpen}
        onMobileOpenChange={setMobileNavOpen}
      />

      <div className="min-w-0 lg:ml-64">{children}</div>
    </div>
  );
}
