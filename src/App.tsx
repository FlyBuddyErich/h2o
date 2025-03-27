"use client"

import { useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import { useFinanceStore } from "./store/financeStore"

function App() {
  const { generateData } = useFinanceStore()

  useEffect(() => {
    generateData()
  }, [generateData])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App

