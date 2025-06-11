import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <Component {...pageProps} />
          </div>
        </div>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          },
          duration: 4000,
        }}
      />
    </div>
  )
}
