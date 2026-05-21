export function showSubmittedData(data: unknown, message?: string) {
  if (message) {
    console.log(message, data)
  } else {
    console.log('Submitted data:', data)
  }
}
