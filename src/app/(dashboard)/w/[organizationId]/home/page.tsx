// app/(dashboard)/home/page.tsx
"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isLoaded, isSignedIn, orgId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/login");
    } else if (!orgId) {
      router.replace("/create-workspace");
    }
  }, [isLoaded, isSignedIn, orgId, router]);

  // 未加载完或即将重定向时返回空
  if (!isLoaded || !isSignedIn || !orgId) return null;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Home</h1>
      <p className="text-muted-foreground mb-6">
        在这里渲染你的工作区仪表盘内容。
      </p>

      {/* 你的组件 / 图表 / 列表 */}
    </main>
  );
}
