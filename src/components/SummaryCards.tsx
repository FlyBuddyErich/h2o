"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useFinanceStore } from "../store/financeStore"
import { formatCurrency } from "../utils/formatters"

const SummaryCards = () => {
  const { summaryData } = useFinanceStore()

  const cards = [
    {
      title: "Итоги",
      amount: summaryData.total,
      change: summaryData.totalChange,
      color: "bg-teal-400",
      textColor: "text-white",
      width: "col-span-1",
    },
    {
      title: "B2B",
      amount: summaryData.b2b,
      change: summaryData.b2bChange,
      color: "bg-white",
      textColor: "text-gray-800",
      width: "col-span-1",
    },
    {
      title: "B2C",
      amount: summaryData.b2c,
      change: summaryData.b2cChange,
      color: "bg-white",
      textColor: "text-gray-800",
      width: "col-span-1",
    },
  ]

  return (
    <>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`rounded-4xl shadow-sm flex items-center justify-center ${card.color} ${card.width}`}
        >
          <div className="py-8 px-4">
            <div
              className={`inline-flex items-center gap-1 px-9 py-1.5 rounded-full mb-3 ${
                index === 0 ? "bg-teal-300/50" : card.change > 0 ? "bg-teal-100" : "bg-red-100"
              }`}
            >
              {card.change > 0 ? (
                <ArrowUpRight size={16} className="text-teal-500" />
              ) : (
                <ArrowDownRight size={16} className="text-red-500" />
              )}
              <span className={card.change > 0 ? "text-teal-500" : "text-red-500"}>{Math.abs(card.change)}%</span>
            </div>

            <div className={`text-2xl font-bold ${card.textColor}`}>₽ {formatCurrency(card.amount)}</div>
            <div className={`text-md text-center font-medium ${index === 0 ? "text-white" : "text-black"}`}>{card.title}</div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

export default SummaryCards

