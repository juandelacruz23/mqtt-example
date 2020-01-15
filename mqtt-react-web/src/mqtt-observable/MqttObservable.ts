import Paho, { Message } from "paho-mqtt";
import { Observable, AsyncSubject, defer } from "rxjs";
import { share } from "rxjs/operators";

export class Client extends Paho.Client {
  constructor(host: string, port: number, path: string, clientId: string) {
    super(host, port, path, clientId);
  }

  connectObservable(connectOptions?: ConnectionOptions): Observable<void> {
    return defer(() => {
      const subject = new AsyncSubject<void>();
      const onSuccess: Paho.OnSuccessCallback = (): void => {
        subject.next();
        subject.complete();
      };
      const onFailure: Paho.OnFailureCallback = (e: ConnectionError) =>
        subject.error(e);
      const pahoConnectionOptions: Paho.ConnectionOptions = {
        ...connectOptions,
        onSuccess,
        onFailure,
      };
      this.connect(pahoConnectionOptions);
      return subject;
    }).pipe(share());
  }

  subscribeObservable(
    filter: string,
    subscriptionOptions?: SubscriptionOptions,
  ): Observable<Message> {
    return new Observable<Message>(subscribe => {
      const onSuccess = (): void => {
        this.onMessageArrived = (message): void => {
          subscribe.next(message);
        };
      };

      const onFailure = (e: ConnectionError): void => {
        subscribe.error(e);
      };

      this.subscribe(filter, {
        ...subscriptionOptions,
        onSuccess,
        onFailure,
      });

      return (): void => {
        this.unsubscribe(filter);
      };
    });
  }

  disconnectObservable(): Observable<void> {
    return defer(() => {
      const subject = new AsyncSubject<void>();
      this.disconnect();
      subject.next();
      subject.complete();
      return subject;
    }).pipe(share());
  }
}

export type ConnectionOptions = Omit<
  Paho.ConnectionOptions,
  "onSuccess" | "onFailure"
>;

export type SubscriptionOptions = Omit<
  Paho.SubscribeOptions,
  "onSuccess" | "onFailure" | "invocationContext"
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectionError extends Paho.ErrorWithInvocationContext {}
