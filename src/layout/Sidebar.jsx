"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Heading, Paragraph } from "@/components/ui/typography";
import Link from "next/link";
import clsx from "clsx";
import { Dashboard } from "@/svg/Icon";
import { Package, LayoutDashboard, BookText, Settings, PanelRight } from "lucide-react";

function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { label: "Products", icon: Package, href: "/products" },
    { label: "Blogs", icon: BookText, href: "/blogs" },
    { label: "Settings", icon: Settings, href: "/user-preferences" },
  ];

  return (
    <aside
      className={clsx(
        "bg-primary-foreground h-screen shadow-[0px_1px_3px_0px_var(--primary)] relative flex flex-col transition-all duration-300 px-2",
        isExpanded
          ? "md:w-[160px] lg:w-[180px] xl:w-[200px] 2xl:w-[210px]"
          : "w-[60px]"
      )}
    >
      {/* Sidebar toggle button */}
      <div
        className={`flex justify-center absolute
            ${isExpanded
                  ? "right-2 top-2"
                  : "right-1 top-2"}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <PanelRight className="text-light" />
      </div>

      {/* Logo */}
      <div className="mt-12 flex items-center justify-center gap-2">
        <div className="w-8 h-8">
          <Dashboard className="w-full h-full text-primary" />
        </div>
        {isExpanded && (
          <Heading level="large" className="font-[800] text-normal">
            Dashlite
          </Heading>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-[5px] px-3 py-2 transition-all",
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-primary/10 text-extraLight",
                isExpanded
                  ? "justify-start"
                  : "justify-center w-fit mx-auto"
              )}
            >
              <Icon
                className={clsx(
                  "w-5 h-5",
                  isActive ? "text-white" : "text-light", 
                )}
              />
              {isExpanded && (
                <span className={clsx("font-[500]",
                isActive ? "text-white" : "text-light")}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
