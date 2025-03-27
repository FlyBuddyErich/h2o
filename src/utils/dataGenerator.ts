interface FinanceData {
    division: string
    date: string
    amount: string
    type: "expanses" | "income" | "revenue" | "debt"
  }
  
  export const generateRandomData = (count: number): FinanceData[] => {
    const data: FinanceData[] = []
    const divisions = ["B2B", "B2C"]
    const types: ("expanses" | "income" | "revenue" | "debt")[] = ["expanses", "income", "revenue", "debt"]
  
    const today = new Date()
  
    for (let i = 0; i < count; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - Math.floor(Math.random() * 365))
  
      data.push({
        division: divisions[Math.floor(Math.random() * divisions.length)],
        date: date.toISOString(),
        amount: (Math.floor(Math.random() * 50000) + 5000).toString(),
        type: types[Math.floor(Math.random() * types.length)],
      })
    }
  
    return data
  }
  
  export const generateProblemZones = () => {
    return [
      {
        name: "Личный персонал",
        amount: 300367,
        severity: "high" as const,
      },
      {
        name: "Продолжение разовых работ ФОТ",
        amount: 901470,
        severity: "high" as const,
      },
      {
        name: "Бензин (выходные)",
        amount: 278325,
        severity: "high" as const,
      },
      {
        name: "Закупка инвентаря",
        amount: 44742,
        severity: "medium" as const,
      },
      {
        name: "Закупка спецодежды/СИЗ",
        amount: 16810,
        severity: "medium" as const,
      },
      {
        name: "Ремонт оборудования",
        amount: 28570,
        severity: "medium" as const,
      },
      {
        name: "Обслуживание автомобиля",
        amount: 47868,
        severity: "medium" as const,
      },
      {
        name: "Форс-мажоры",
        amount: 13750,
        severity: "medium" as const,
      },
      {
        name: "Рекламные баннеры (Билборды)",
        amount: 101500,
        severity: "high" as const,
      },
      {
        name: "Рекламные баннеры (Контекст)",
        amount: 200000,
        severity: "high" as const,
      },
    ]
  }
  
  