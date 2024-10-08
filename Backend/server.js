import express from 'express';
import { configureRoutes } from './routes.js';
import { configureSwagger } from './swagger.js';
import { configureDependencies } from './dependencies.js';
import { configureMiddlewares } from './middlewares.js';
import { Dependency } from './libs/dependency.js';
import mongoose from 'mongoose';

configureDependencies();

const conf = Dependency.get('conf');

mongoose.connect(conf.db); //://127.0.0.1:27017/tuds-da'//

const app = express();
const router = configureMiddlewares(app);
configureRoutes(router);
configureSwagger(router);

app.get('*', (req, res) => {
  res.sendFile(req.path, { root: './dist'});
});

app.all('*', (req, res) => {
  res.status(405).send('Metodo no permitido.');
});   

app.listen(conf.port, () => {
  console.log(`El servidor está aceptando conexiones en el puerto ${conf.port}`);
});