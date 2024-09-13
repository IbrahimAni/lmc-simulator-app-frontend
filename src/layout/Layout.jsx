import React from 'react'
import { Navbar, Footer } from '../components'

const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-4">
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout