import { Header } from "@/layouts/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />
      {children}
    </main>
  );
}