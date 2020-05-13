import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {WebSocketMessage} from 'rxjs/internal/observable/dom/WebSocketSubject';
import {map} from 'rxjs/operators';


interface WsMessage {
  event: string;
  data: any;
}

@Injectable()
export class BackendService {

  constructor() {}

  private subject: WebSocketSubject<any>;

  public connect(): WebSocketSubject<any> {

    const url = 'ws://127.0.0.1:3000';
    // const url = 'wss://echo.websocket.org';

    if (!this.subject) {

      console.log('reconnect');
      const jonfig = {
        deserializer(event: MessageEvent): any {
          console.log('deserializer', event);
          return JSON.parse(event.data);
        },
        serializer(value: any): WebSocketMessage {
          console.log('serializer', value);
          return JSON.stringify(value);
        },
        url
      };
      this.subject = webSocket(jonfig);
      this.subject
          .subscribe(
              (msg) => console.log('message received: ', msg),
              (err) => console.log(err),
              () => console.log('complete')
          );
    }

    return this.subject;
  }


  public send(event: string, data: any) {

    this.subject.next({event, data});
  }


  public observe<T>(subscriptionName: string): Observable<T> {

    return this.subject.multiplex(
        () => ({event: `subscribe:${subscriptionName}`}),
        () => ({event: `unsubscribe:${subscriptionName}`}),
        message => {
          return message.event === subscriptionName;
        }
    ).pipe(map((event: WsMessage): T => event.data));
  }
}
