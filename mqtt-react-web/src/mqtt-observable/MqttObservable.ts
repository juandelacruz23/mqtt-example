import Paho, { Message } from "paho-mqtt";
import { Observable, AsyncSubject, defer, Subject } from "rxjs";
import { share } from "rxjs/operators";

export class Client extends Paho.Client {
  subscription!: Subject<Message>;
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
    this.subscription = new Subject<Message>();

    const onSuccess = (): void => {
      this.onMessageArrived = (message): void => {
        this.subscription.next(message);
      };
    };

    const onFailure = (e: ConnectionError): void => {
      this.subscription.error(e);
    };

    this.subscribe(filter, {
      ...subscriptionOptions,
      onSuccess,
      onFailure,
    });
    return this.subscription.asObservable();
  }

  unsubscribeObservable(
    filter: string,
    options?: UnsubscriptionOptions,
  ): Observable<void> {
    return new Observable<void>(subscribe => {
      this.unsubscribe(filter, {
        ...options,
        onSuccess: () => {
          this.subscription.complete();
          subscribe.next();
          subscribe.complete();
        },
        onFailure: e => {
          this.subscription.complete();
          subscribe.error(e);
        },
      });
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

export type UnsubscriptionOptions = Omit<
  Paho.UnsubscribeOptions,
  "onSuccess" | "onFailure" | "invocationContext"
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectionError extends Paho.ErrorWithInvocationContext {}
