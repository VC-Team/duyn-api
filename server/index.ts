import 'module-alias/register';

import '@infrastructure/config/env';
import './booters';

import Server from '@infrastructure/http/server';
import routes from '@adapters/routes';
import mongoConnect from '@infrastructure/mongodb';

import errorHandler from '@adapters/middlewares/error.handler';
import WebSocketServer from '@infrastructure/websocket/server';

const start = async () => {
  const port = parseInt(process.env.PORT);
  const server = new Server();
  (server.injectHTTPServer((httpServer) => {
    return new WebSocketServer(httpServer);
  }) as unknown) as WebSocketServer;

  await mongoConnect();

  server.router(routes);
  server.setDefaultErrorHandler(errorHandler);
  server.listen(port);

  return server;
};

start();
