import express from 'express';
import { PORT, LOG_FORMAT } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { errorMiddleware, getAllErrors } from '@middlewares/error.middleware';
import { defaultClient as client, ConnectionDB, defaultPool as pool } from '@database/connection';
import cors from 'cors';
import { swagger } from '@models/swagger';
import swaggerUi from 'swagger-ui-express';
import hpp from 'hpp';
import { logger, stream } from '@utils/logger';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public database: ConnectionDB;

  constructor(routes: Routes[]) {
    this.app = express();
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
      logger.info(`╭───────────────────────────────────────────────────╮`);
      logger.info(`│                                                   │`);
      logger.info(`│            App listening at port ${this.port}!            │`);
      logger.info(`│                                                   │`);
      logger.info(`╰───────────────────────────────────────────────────╯`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(cors());
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
