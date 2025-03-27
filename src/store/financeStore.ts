import { create } from "zustand"
import { generateRandomData, generateProblemZones } from "../utils/dataGenerator"

interface SelectedPoint {
  value: number
  x: number
  y: number
}

interface SummaryData {
  total: number
  totalChange: number
  b2b: number
  b2bChange: number
  b2c: number
  b2cChange: number
}

interface ProblemZone {
  name: string
  amount: number
  severity: "high" | "medium"
}

interface ChartDataPoint {
  name: string
  revenue: number
  expenses: number
  profit: number
  debt: number
  total: number
}

interface FinanceState {
  data: any[]
  chartData: ChartDataPoint[]
  weekData: ChartDataPoint[]
  monthData: ChartDataPoint[]
  yearData: ChartDataPoint[]
  summaryData: SummaryData
  problemZones: ProblemZone[]
  period: "week" | "month" | "year"
  activeTab: "employees" | "company" | "sales"
  selectedPoint: SelectedPoint | null
  generateData: () => void
  setPeriod: (period: "week" | "month" | "year") => void
  setActiveTab: (tab: "employees" | "company" | "sales") => void
  setSelectedPoint: (point: SelectedPoint | null) => void
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  data: [],
  chartData: [],
  weekData: [],
  monthData: [],
  yearData: [],
  summaryData: {
    total: 0,
    totalChange: 0,
    b2b: 0,
    b2bChange: 0,
    b2c: 0,
    b2cChange: 0,
  },
  problemZones: [],
  period: "year",
  activeTab: "company",
  selectedPoint: null,

  generateData: () => {
    const rawData = generateRandomData(100)

    const total = 10157764
    const b2b = 8615253
    const b2c = -1542511

    const summaryData = {
      total,
      totalChange: 21.5,
      b2b,
      b2bChange: 43.7,
      b2c,
      b2cChange: -13.7,
    }

    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    const weekData = days.map((day) => {
      const revenue = Math.floor(Math.random() * 1000000) + 500000
      const expenses = Math.floor(Math.random() * 800000) + 400000
      const profit = Math.floor(Math.random() * 300000) - 100000
      const debt = Math.floor(Math.random() * 100000)

      return {
        name: day,
        revenue,
        expenses,
        profit,
        debt,
        total: revenue + profit, // Итог как сумма выручки и прибыли
      }
    })


    const monthData = Array.from({ length: 30 }, (_, i) => {
      const revenue = Math.floor(Math.random() * 5000000) + 2500000
      const expenses = Math.floor(Math.random() * 4000000) + 2000000
      const profit = Math.floor(Math.random() * 1500000) - 500000
      const debt = Math.floor(Math.random() * 500000)

      return {
        name: `${i + 1}`,
        revenue,
        expenses,
        profit,
        debt,
        total: revenue + profit,
      }
    })

   
    const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
    const yearData = months.map((month) => {
      const revenue = Math.floor(Math.random() * 10000000) + 5000000
      const expenses = Math.floor(Math.random() * 8000000) + 4000000
      const profit = Math.floor(Math.random() * 3000000) - 1000000
      const debt = Math.floor(Math.random() * 1000000)

      return {
        name: month,
        revenue,
        expenses,
        profit,
        debt,
        total: revenue + profit,
      }
    })

    const problemZones = generateProblemZones()

    set({
      data: rawData,
      summaryData,
      weekData,
      monthData,
      yearData,
      chartData: yearData,
      problemZones,
    })
  },

  setPeriod: (period) => {
    const state = get()
    let chartData

    switch (period) {
      case "week":
        chartData = state.weekData
        break
      case "month":
        chartData = state.monthData
        break
      case "year":
        chartData = state.yearData
        break
      default:
        chartData = state.yearData
    }

    set({ period, chartData })
  },

  setActiveTab: (activeTab) => set({ activeTab }),
  setSelectedPoint: (selectedPoint) => set({ selectedPoint }),
}))

