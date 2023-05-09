import { swagger } from './modules/Swagger';
import { getAllErrors } from './middlewares/error.middleware';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { defaultClient as client, ConnectionDB, defaultPool as pool } from './database/connection';
import cors from 'cors';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public database: ConnectionDB;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3001;
    this.database = new ConnectionDB(client, pool);

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.database.initializeDB();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.app.use('/healthcheck', require('express-healthcheck')());
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeSwagger(): void {
    const specs = swagger();
    this.app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling(): void {
    this.app.get('/api/v1/errors', getAllErrors);
    this.app.use(errorMiddleware);
  }
}

export default App;
