export const httpError = (message, status) => {
  const error = new Error(message)
  error.status = status
  return error
}
