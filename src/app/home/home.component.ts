import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faComment = faComment;

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('shout');
  }
}
