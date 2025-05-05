// src/app/(routes)/dashboard/layout.tsx
import DashboardClientLayout from "@/components/layout/DashboardClientLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
