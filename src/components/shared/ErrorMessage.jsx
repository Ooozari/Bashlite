import React from 'react';

export default function ErrorMessage({ error, touched }) {
  if (!touched || !error) return null;
  return <p className="text-[var(--destructive)]  text-xs absolute left-0 bottom-[-16px] ">{error}</p>;
}
