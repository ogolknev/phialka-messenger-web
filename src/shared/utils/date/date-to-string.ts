export function dateToString(date: Date, format: 'yyyy-MM-dd' | 'dd.MM.yyyy') {
  let result: string | null = null
  const [day, month, year] = [
    String(date.getDate()).padStart(2, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getFullYear()),
  ]
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
