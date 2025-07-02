// src/components/ui/button.tsx
"use client";
import React from "react";
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="rounded-md border px-4 py-2 hover:bg-gray-100" {...props} />;
}
