export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("ru-RU").format(value)
  }
  
  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }
  
  