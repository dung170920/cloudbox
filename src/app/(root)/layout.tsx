import { Header } from "@/layouts/Header";
import { Sidebar } from "@/layouts/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        {children}
      </div>
    </main>
  );
}