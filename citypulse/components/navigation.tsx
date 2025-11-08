"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Map, Users } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/map", label: "Map", icon: Map },
    { href: "/dashboard", label: "Dashboard", icon: null },
    { href: "/team", label: "Team", icon: Users },
  ];

  const authItems = [
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-black/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-black dark:bg-white text-white dark:text-black flex size-6 items-center justify-center rounded-md transition-transform group-hover:scale-105">
            <MapPin className="size-4" />
          </div>
          <span className="text-lg font-semibold text-black dark:text-white">
            CityPulse
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive &&
                            "bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
                        )}
                      >
                        {Icon && <Icon className="mr-1.5 size-4" />}
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
              <div className="mx-2 h-4 w-px bg-gray-200 dark:bg-gray-800" />
              {authItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive &&
                            "bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
