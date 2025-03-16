import { Sidebar } from "@/components/dashboard/Sidebar"
import { Header } from "@/components/dashboard/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-zinc-900 bg-[url('/patterns/japanese-pattern.png')] bg-repeat">
      <div className="min-h-screen backdrop-blur-sm bg-white/30 dark:bg-black/30">
        <Sidebar />
        <div className="pl-64">
          <Header />
          <main className="p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 