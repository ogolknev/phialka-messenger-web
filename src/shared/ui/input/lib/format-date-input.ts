export function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8)

  const day = digits.slice(0, 2)
  const month = digits.slice(2, 4)
  const year = digits.slice(4, 8)

  let result = day
  if (month.length) result += "." + month
  if (year.length) result += "." + year

  return result
}
