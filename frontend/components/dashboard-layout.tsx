import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  HomeIcon,
  ChartBarIcon,
  FolderIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const NavItems = () => (
    <nav className="mt-8 space-y-1 px-2">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`sidebar-item ${router.pathname === item.href ? 'active' : ''}`}
        >
          <item.icon
            className="h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex w-full flex-col bg-[#232338] pt-5 pb-4">
                  <div className="flex items-center justify-between px-4">
                    <div className="text-mint font-bold text-xl">ML Drift Tracker</div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-mint transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <NavItems />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-[#232338]">
          <div className="flex h-16 items-center px-6 border-b border-gray-800">
            <div className="text-mint font-bold text-xl">ML Drift Tracker</div>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <NavItems />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-72">
        <div className="sticky top-0 z-10 bg-[#232338]/80 backdrop-blur-sm pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 hover:text-mint transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}