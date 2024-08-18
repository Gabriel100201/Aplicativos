import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { InvalidAuthorizationSchemaError } from './libs/invalid_authorization_schema_error.js';
import { InvalidAuthorizationTokenError } from './libs/invalid_authorization_token_error.js';
import { Dependency } from './libs/dependency.js';

export function configureMiddlewares(app) {
  app.use(cors());

  app.use('/', express.json());

  const router = express.Router();
  app.use('/api', router);

  app.use(errorHandler);

  app.use(authorizationMiddleware);

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
function authorizationMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    next();
    return;
  }

  const auth = req.headers.authorization;
  if (auth.substr(0, 7).toLowerCase() !== 'bearer ') {
    throw new InvalidAuthorizationSchemaError();
  }

  const token = auth.substr(7).trim();
  if (!token) {
    throw new InvalidAuthorizationTokenError();
  }

  const conf = Dependency.get('conf');
  jwt.verify(
    token,
    conf.jwtPassword,
    async (err, data) => {
      if (err, data) {
        if (err) {
          throw new InvalidAuthorizationTokenError();
        }

        const userService = Dependency.get('userService');
        const user = await userService.getForUsernameOrNull(data.username);

        if (!user || !user.isEnabled) {
          throw new InvalidAuthorizationTokenError();
        }

        req.user = user;

        next();
      }
    });
}