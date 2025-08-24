'use client';

import React, { useState } from 'react';
import Sidebar from '@/layout/Sidebar';
import clsx from 'clsx';
import { PanelRight } from 'lucide-react'; 
import { Heading } from './ui/typography';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-primary-page-bg relative">
      {/* Desktop Sidebar - Collapsed but Sticky */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full z-30">
        <Sidebar isExpanded={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <div
        className={clsx(
          "fixed left-0 top-0 h-full z-40 transition-transform duration-300 ease-in-out lg:hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar isExpanded={true} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Dark Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Main Content */}
      <div
        className={clsx(
          "flex flex-col w-full transition-all duration-300",
          !isSidebarOpen && "lg:pl-[60px]"
        )}
      >
        {/* Top Bar with Mobile Menu Icon */}
        <div className="lg:hidden sticky top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-2 bg-primary-page-bg shadow-[0_1px_4px_var(--shadow-light-color)]">
          <button onClick={() => setIsSidebarOpen(true)}>
            <PanelRight size={24} className="text-dark " />
          </button>
          <Heading level='sectionheading' className="text-dark font-bold">BashLite</Heading>
        </div>

        {/* Scrollable Content */}
        <div className="px-[20px] sm:px-[22px] md:px-[24px] lg:px-[26px] xl:px-[28px] 2xl:px-[30px] overflow-y-auto mb-[100px] md:mb-[40px] pt-[30px] sm:pt-[32px] md:pt-[34px] lg:pt-[36px] xl:pt-[38px] 2xl:pt-[40px]">
          {children}
        </div>
      </div>
    </div>
  );
}
