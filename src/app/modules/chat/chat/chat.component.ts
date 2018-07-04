import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { getLoadingState } from '../../../reducers/loading.reducer';

import { AuthService } from '../../core/auth.service';
import { State } from '../../../reducers';
import { User } from '../../core/core.types';
import { GetCurrentUser } from '../../../actions';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private authService: AuthService, private title: Title, private router: Router, private store: Store<State>) {
    this.loading$ = this.store.select(getLoadingState);
  }

  ngOnInit(): void {
    this.title.setTitle('shout');
    this.store.dispatch(new GetCurrentUser());
  }
}
