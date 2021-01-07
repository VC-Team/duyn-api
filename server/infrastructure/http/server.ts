import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';

import * as OpenApiValidator from 'express-openapi-validator';

const app = express();

export default class ExpressServer {
  private routes: (app: Application) => void;
  private httpServer: http.Server;
  constructor() {
    const root = path.normalize(process.cwd());
    app.use(cors());
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));

    const apiSpec = path.join(__dirname, 'api.yml');
    app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec));

    const validateResponses = !!(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );
    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );

    this.httpServer = http.createServer(app);
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    this.httpServer.listen(port, welcome(port));
    return app;
  }

  setDefaultErrorHandler(
    handler: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
      err: any,
      req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction
    ) => void
  ): Application {
    app.use((handler as unknown) as ErrorRequestHandler);
    return app;
  }

  injectHTTPServer(injectHandler: (httpServer: http.Server) => void): void {
    return injectHandler(this.httpServer);
  }
}
