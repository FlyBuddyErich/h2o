"use client"

import { motion } from "framer-motion"
import { useFinanceStore } from "../store/financeStore"
import { formatCurrency } from "../utils/formatters"

const ProblemZones = () => {
  const { problemZones } = useFinanceStore()

  return (
    <div className="card h-full w-md rounded-4xl">
      <h2 className="font-medium text-xl mb-4">Проблемные зоны</h2>

      <div>
        {problemZones.map((zone, index) => (
          <motion.div
            key={index}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="problem-item"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-md font-bold ${zone.severity === "high" ? "bg-[#FC5C65]" : zone.severity === "medium" ? "bg-[#F7B731]" : zone.severity}`}
            >
              !
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#6D7986]">{zone.name}</div>
              <div className="text-lg font-bold">₽ {formatCurrency(zone.amount)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProblemZones

