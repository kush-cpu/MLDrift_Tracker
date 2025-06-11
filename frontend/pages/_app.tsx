import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Toaster } from 'sonner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <Component {...pageProps} />
        </div>
      </Layout>
      <Toaster />
    </>
  )
}
