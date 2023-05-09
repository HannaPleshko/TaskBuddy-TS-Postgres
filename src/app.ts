import express from 'express';
import { PORT } from './config';
import { Routes } from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { defaultClient as client, ConnectionDB, defaultPool as pool } from './database/connection';
import cors from 'cors';

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
    this.initializeErrorHandling();
    this.database.initializeDB();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`╭───────────────────────────────────────────────────╮`);
      console.log(`│                                                   │`);
      console.log(`│            App listening at port ${this.port}!            │`);
      console.log(`│                                                   │`);
      console.log(`╰───────────────────────────────────────────────────╯`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default App;