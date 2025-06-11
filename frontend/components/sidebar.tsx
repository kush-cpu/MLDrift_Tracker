import Link from 'next/link'
import { FileBarChart, UploadCloud, Download, Activity } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-sm px-4 py-6 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-8 text-blue-600">ModelDriftTrackr</h2>
      <nav className="flex flex-col space-y-4">
        <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <FileBarChart size={18} /> Dashboard
        </Link>
        <Link href="/upload" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <UploadCloud size={18} /> Upload Model
        </Link>
        <Link href="/drift" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <Activity size={18} /> Drift Check
        </Link>
        <Link href="/report" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <Download size={18} /> Export Report
        </Link>
      </nav>
    </aside>
  )
}
