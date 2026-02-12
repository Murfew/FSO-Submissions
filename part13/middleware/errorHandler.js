const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.message })
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409).json({ error: err.message});
  }

  return res.status(500).json({ error: 'internal server error' })
}
export default errorHandler
