import Sidebar from "./sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">{children}</main>
    </div>
  )
}
