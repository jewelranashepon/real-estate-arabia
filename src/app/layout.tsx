import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./components/providers"
import Appbar from "./components/Appbar"
import SignInPanel from "./components/signInPanel"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from "./components/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Birds of Eden Real Estate",
  description: "Find your dream property with Birds of Eden",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <Appbar>
              <SignInPanel />
            </Appbar>
            {children}
            <ToastContainer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'