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
    const [isHovered, setIsHovered] = useState(false);

    const menuItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/" },
        { label: "Products", icon: Package, href: "/products" },
        { label: "Blogs", icon: BookText, href: "/blogs" },
        { label: "Settings", icon: Settings, href: "/user-preferences" },
    ];

    return (
        <aside
            className={clsx(
                "bg-primary-foreground h-screen shadow-[0px_1px_3px_0px_var(--primary)]  flex flex-col transition-all duration-300",
                isExpanded
                    ? "md:w-[160px] lg:w-[180px] xl:w-[200px] 2xl:w-[210px]"
                    : "lg:w-[60px]"
            )}
        >
            {/* Logo */}
            <div className="flex justify-between mx-auto">
                <div
                    className="mt-6 flex items-center gap-2 relative"
                    onMouseEnter={() => !isExpanded && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Collapsed State: Switch Icons on Hover */}
                    {!isExpanded && (
                        <div
                            className="w-6 h-6 xl:w-7 xl:h-7 cursor-pointer transition-all duration-200 flex justify-center items-center"
                            onClick={() => setIsExpanded(true)}
                        >
                            {isHovered ? (
                                <PanelRight className="w-[18px] h-[18px] xl:w-5 xl:h-5 text-normal transition-all duration-200" />
                            ) : (
                                <Dashboard className="w-6 h-6 xl:w-7 xl:h-7 text-primary transition-all duration-200" />
                            )}
                        </div>
                    )}

                    {/* Expanded State: Show Title + Collapse Icon */}
                    {isExpanded && (
                        <div className="flex justify-between items-center gap-4">  <div className="flex gap-1 items-center justify-center">
                            <Dashboard className="w-6 h-6 xl:w-7 xl:h-7 text-primary transition-all duration-200" />
                            <Heading
                                level="large"
                                className="font-[800] text-normal transition-all duration-200"
                            >
                                Dashlite
                            </Heading>
                        </div>

                            <div
                                className="w-[18px] h-[18px] xl:w-5 xl:h-5 cursor-pointer"
                                onClick={() => setIsExpanded(false)}
                            >
                                <PanelRight className="w-full h-full text-normal transition-all duration-200" />
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* Navigation */}
            <nav className="mt-8 flex flex-col gap-2 px-2">
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
