import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { faComments, faUser } from '@fortawesome/free-solid-svg-icons';

import { getLoadingState } from '../../../reducers/loading.reducer';
import { State } from '../../../reducers';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  icons = {
    user: faUser,
    rooms: faComments
  };

  loading$: Observable<boolean>;

  constructor(private title: Title, private store: Store<State>) {
    this.loading$ = this.store.select(getLoadingState);
  }

  ngOnInit(): void {
    this.title.setTitle('shout: Administration');
  }
}
