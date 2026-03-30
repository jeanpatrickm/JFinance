"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  DollarSign,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transações", icon: ArrowLeftRight },
  //{ href: "/investments", label: "Investimentos", icon: TrendingUp },
  { href: "/accounts", label: "Contas", icon: Wallet },
  // { href: "/settings", label: "Configurações", icon: Settings },
];

type SidebarNavProps = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

export function SidebarNav({ mobileOpen, onMobileOpenChange }: SidebarNavProps) {
  const pathname = usePathname();
  const closeMobile = () => onMobileOpenChange(false);

  return (
    <aside
      id="app-sidebar"
      className={cn(
        "fixed left-0 top-0 z-50 h-screen w-[min(100vw-2rem,16rem)] border-r border-border bg-sidebar transition-transform duration-300 ease-out sm:w-64",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-border px-4 sm:px-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="min-w-0 flex-1 truncate text-xl font-semibold text-foreground">
            JFinance
          </span>
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground lg:hidden"
            aria-label="Fechar menu"
            onClick={closeMobile}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={closeMobile}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              U
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-foreground">Usuário</p>
              <p className="text-xs text-muted-foreground">Plano Premium</p>
            </div>
          </div>
        </div> */}
      </div>
    </aside>
  );
}
