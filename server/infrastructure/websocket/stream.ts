import ss from 'socket.io-stream';
import WebSocketServer from './server';

interface SocketStreamEventTrigger {
  eventName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: (stream: any, data: any, socket: any) => void;
}

export default class WebSocketStream {
  private static triggers: SocketStreamEventTrigger[];

  injectSocketServer(socketServer: WebSocketServer): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance: any = ss(socketServer);
    WebSocketStream.triggers.forEach((trigger) =>
      instance.on(trigger.eventName, trigger.trigger)
    );
  }

  static load = (triggers: SocketStreamEventTrigger[]): void => {
    WebSocketStream.triggers = triggers;
  };
}
