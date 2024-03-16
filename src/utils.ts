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

export function clearValues(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (key === 'value') {
      // eslint-disable-next-line no-param-reassign
      obj[key] = ''
    } else if (typeof obj[key] === 'object') {
      clearValues(obj[key])
    }
  })
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
export function ensureProtocol(url: string | undefined) {
  if (!url) {
    return ''
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

export function getSessionDuration(startDateObject: Date, endDateObject: Date) {
  const differenceInMilliseconds = endDateObject.getTime() - startDateObject.getTime()
  const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60))
  const differenceInHours = Math.floor(differenceInMinutes / 60)
  const remainingMinutes = differenceInMinutes % 60

  let durationDisplay
  if (differenceInHours === 0) {
    durationDisplay = `${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''}`
  } else if (remainingMinutes === 0) {
    durationDisplay = `${differenceInHours} hour${differenceInHours !== 1 ? 's' : ''}`
  } else {
    durationDisplay = `${differenceInHours} hour${differenceInHours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`
  }
  return durationDisplay
}
