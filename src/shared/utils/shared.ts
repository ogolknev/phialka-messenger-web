export function formatDate(
  date?: string,
  from: DateStringFormat = 'dd.mm.yyyy',
  to: DateStringFormat = 'yyyy-mm-dd',
) {
  if (!date) return ''
  let day, month, year
  date = date.slice(0, 10)
  if (from === 'dd.mm.yyyy') {
    ;[day, month, year] = date.split('.')
  } else if (from === 'yyyy.mm.dd') {
    ;[year, month, day] = date.split('.')
  } else if (from === 'dd-mm-yyyy') {
    ;[day, month, year] = date.split('-')
  } else {
    ;[year, month, day] = date.split('-')
  }
  if (to === 'dd.mm.yyyy') {
    return `${day}.${month}.${year}`
  } else if (to === 'yyyy.mm.dd') {
    return `${year}.${month}.${day}`
  } else if (to === 'dd-mm-yyyy') {
    return `${day}-${month}-${year}`
  } else {
    return `${year}-${month}-${day}`
  }
}

export function stringToDateString(string: string) {
  string = string.replace(/\D/g, '').slice(0, 8)
  string = [string?.slice(0, 2), string?.slice(2, 4), string?.slice(4, 8)].filter(Boolean).join('.')
  return string
}

export async function getCanvasBlob(
  canvas: HTMLCanvasElement,
  type: 'image/png' | 'image/jpeg' = 'image/png',
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      }
      reject("Can't receive blob from canvas.")
    }, type)
  })
}
