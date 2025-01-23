export function formatDate(date: string, from: 'dd.mm.yyyy' | 'yyyy-mm-dd' = 'dd.mm.yyyy', to: 'dd.mm.yyyy' | 'yyyy-mm-dd' = 'yyyy-mm-dd') {
  if (!date) return
  let day, month, year
  if (from === 'dd.mm.yyyy') {
    [day, month, year] = date.split('.')
  } else {
    [year, month, day] = date.split('-')
  }
  if (to === 'dd.mm.yyyy') {
    return `${day}.${month}.${year}`
  } else {
    return `${year}-${month}-${day}`
  }
}

export async function getCanvasBlob(canvas: HTMLCanvasElement, type: 'image/png' | 'image/jpeg' = 'image/png') {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      }
      reject("Can't receive blob from canvas.")
    }, type)
  })
}
