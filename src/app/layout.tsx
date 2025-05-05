// src/app/(routes)/dashboard/layout.tsx
import RootClientLayout from "@/components/layout/RootClientLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootClientLayout>{children}</RootClientLayout>;
}
