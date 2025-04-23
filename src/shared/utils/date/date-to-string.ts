export function dateToString(date: Date, format: 'yyyy-MM-dd' | 'dd.MM.yyyy') {
  let result: string | null = null
  const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
  if (format === 'yyyy-MM-dd') {
    result = `${year}-${month}-${day}`
  } else if (format === 'dd.MM.yyyy') {
    result = `${day}.${month}.${year}`
  }
  if (!result) {
    throw new Error('Unexpected date format')
  }
  return result
}
