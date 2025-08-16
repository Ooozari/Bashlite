"use client";

import React, { useEffect, useState } from "react";

function Home() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300 p-6">
      {/* Theme Toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white hover:opacity-80 transition"
        >
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-4">
        CMS Dashboard Overview
      </h1>
      <p className="text-[var(--color-text)] mb-8">
        Welcome back! Here’s an overview of your CMS content.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg shadow bg-[var(--color-primary)] text-white">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-xl font-bold">12</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-[var(--color-secondary)] text-white">
          <h2 className="text-lg font-semibold">Blogs</h2>
          <p className="text-xl font-bold">8</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-[var(--color-text-light)] text-black">
          <h2 className="text-lg font-semibold">User Preferences</h2>
          <p className="text-xl font-bold">3</p>
        </div>
      </div>

      {/* Example Section */}
      <div className="mt-10 p-6 rounded-lg border border-[var(--bs-border-color)] bg-[var(--bs-body-bg)]">
        <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
          Latest Updates
        </h3>
        <p className="text-[var(--color-text-light)]">
          Here you can see how muted text looks in both light and dark modes.
        </p>
      </div>
    </div>
  );
}

export default Home;
