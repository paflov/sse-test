import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {WebSocketMessage} from 'rxjs/internal/observable/dom/WebSocketSubject';


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
              (msg) => console.log('message received: ' + msg),
              (err) => console.log(err),
              () => console.log('complete')
          );
    }

    const e = {
      event: 'events',
      data: 'dafuq'
    };
    this.subject.next(e);
    // this.subject.next(e);


    const clientCount$ = this.subject.multiplex(
         () => ({event: 'clients.count'}), // When server gets this message, it will start sending messages for 'A'...
         () => ({unsubscribe: 'clients.count'}), // ...and when gets this one, it will stop.
         message => message.type === 'clients.count'
         // If the function returns `true` message is passed down the stream. Skipped if the function returns false.
    );
    const subA = clientCount$.subscribe(messageForA => console.log(messageForA));
    subA.unsubscribe();

    return this.subject;
  }
}
