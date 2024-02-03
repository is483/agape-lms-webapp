export const deepCopy = (obj: object) => JSON.parse(JSON.stringify(obj))

export function formatDateInput(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function clearErrors(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (key === 'error') {
      // eslint-disable-next-line no-param-reassign
      obj[key] = ''
    } else if (typeof obj[key] === 'object') {
      clearErrors(obj[key])
    }
  })
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
