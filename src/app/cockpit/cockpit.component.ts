import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BackendService} from './backend.service';
import {TestInstance} from './cockpit.interfaces';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  constructor(private bs: BackendService) {

  }

  displayedColumns: string[] = ['name', 'test', 'status'];

  dataSource$: Observable<any>;
  clientCount$: Observable<number>;
  serviceConnected$: Observable<boolean>;

  ngOnInit(): void {

    console.log('going to connect');

    this.clientCount$ = this.bs.observe<number>('client.count');

    this.serviceConnected$ = this.bs.serviceConnected$;

    this.serviceConnected$.subscribe(s => {
      console.log('connection-status', s);
    });

    this.dataSource$ = this.bs.observe<TestInstance[]>('tests');

  }


}
