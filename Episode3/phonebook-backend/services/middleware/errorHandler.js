const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Invalid id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'Validation error', message: error.message })
  }
  if (error.name === 'MongoServerError') {
    return response.status(400).send({ error: 'Duplicate name', message: error.message })
  }
  next(error)
}

export default errorHandler
