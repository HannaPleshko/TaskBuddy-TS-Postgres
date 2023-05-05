import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import user from './controller/user.controller';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/user', user);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const id = error.id || 0;

  console.error(`[${new Date().toISOString()}] Error: ${error}`);
  res.status(status).send({ id, message });
});

export default app;
