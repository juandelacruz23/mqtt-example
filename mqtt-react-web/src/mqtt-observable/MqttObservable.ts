import Paho from "paho-mqtt";
import { Observable } from "rxjs";

export class Client extends Paho.Client {
  constructor(host: string, port: number, path: string, clientId: string) {
    super(host, port, path, clientId);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connectObservable(connectOptions?: ConnectionOptions): Observable<any> {
    return new Observable<void>(subscribe => {
      const onSuccess: Paho.OnSuccessCallback = (): void => {
        subscribe.next();
        subscribe.complete();
      };
      const onFailure: Paho.OnFailureCallback = (e: ConnectionError) =>
        subscribe.error(e);
      const pahoConnectionOptions: Paho.ConnectionOptions = {
        ...connectOptions,
        onSuccess,
        onFailure,
      };
      this.connect(pahoConnectionOptions);
    });
  }

  disconnectObservable(): Observable<void> {
    return new Observable<void>(subscribe => {
      this.disconnect();
      subscribe.next();
      subscribe.complete();
    });
  }
}

export type ConnectionOptions = Omit<
  Paho.ConnectionOptions,
  "onSuccess" | "onFailure"
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectionError extends Paho.ErrorWithInvocationContext {}
