'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

export function Toaster({ ...props }) {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme}
      position="top-right"
      className="toaster group"
      toastOptions={{
        style: {
          '--success-text': '#16a34a', // Green for success
          '--error-text': '#dc2626',   // Red for error
        },
        classNames: {
          success: 'group-[.toast]:!text-[var(--success-text)]',
          error: 'group-[.toast]:!text-[var(--error-text)]',
        },
      }}
      {...props}
    />

  )
}
