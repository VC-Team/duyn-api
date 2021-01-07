import { Server } from 'http';
import { Server as SocketIO, Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import WebSocketStream from './stream';

interface EventTrigger {
  eventName: string;
  handler: (...args: unknown[]) => void;
}

export default class WebSocketServer {
  private server: SocketIO = null;

  constructor(httpServer: Server) {
    this.server = new SocketIO(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET'],
      },
      transports: ['websocket'],
      path: '/ws-duyn',
    });
  }

  applyMiddleware = (
    handler: (socket: Socket, next: (err?: ExtendedError) => void) => void
  ): void => {
    this.server.use(handler);
  };

  load = (eventTriggers: EventTrigger[]): void => {
    eventTriggers.forEach((trigger) =>
      this.server.on(trigger.eventName, trigger.handler)
    );
  };

  socketStream(streamServer: typeof WebSocketStream): void {
    this.server.on('connection', (socket) => {
      new streamServer().injectSocketServer(socket);
    });
  }
}
