import { Header } from "@/layouts/Header";
import { Sidebar } from "@/layouts/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}