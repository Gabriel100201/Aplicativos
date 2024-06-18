import express from 'express';
import cors from 'cors';

export function configureMiddlewares(app) {
  app.use(cors());

  app.use('/', express.json());

  const router = express.Router();
  app.use('/api', router);

  app.use(errorHandler);

  return router;
}

function errorHandler(err, req, res, next) {
  if (!(err instanceof Error)) {
    res.status(500).send('Ho no hay un error');
    next();
    return;
  }
  const statusCodes = {
    MissingParameterError: 400,
    ConflictError: 409,
  };

  const name = err.constructor.name;
  const status = statusCodes[name] ?? 500;

  res.status(status).send({
    error: name,
    message: err.message,
  });
}