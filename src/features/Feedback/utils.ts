export function getStatus(status: string, dateDifference: number) {
  if (status === 'Not Completed' && dateDifference <= 0) {
    return 'Pending'
  }
  if (status === 'Not Completed' && dateDifference > 0) {
    return 'Unavailable'
  }
  return 'Complete'
}
