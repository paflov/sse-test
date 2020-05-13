import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BackendService} from './backend.service';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  constructor(private bs: BackendService) {

  }

  displayedColumns: string[] = ['name', 'booklet', 'locked', 'lastlogin', 'laststart'];

  dataSource$: Subject<any>;
  clientCount$: Observable<number>;
  serviceConnected$: Observable<boolean>;

  ngOnInit(): void {

    console.log('going to connect');

    // this.dataSource$ = this.bs.connect();

    // const subject = this.bs.connect();


    // subject.subscribe(x => {
    //   console.log('got:', x);
    // });

    this.clientCount$ = this.bs.observe<number>('client.count');
    this.clientCount$.subscribe(d => {
       console.log('got:', d);
    });
    this.clientCount$.subscribe(d => {
       console.log('got2:', d);
    });

    this.serviceConnected$ = this.bs.serviceConnected$;

    this.serviceConnected$.subscribe(s => {
      console.log('connection-status', s);
    });

  }


}
