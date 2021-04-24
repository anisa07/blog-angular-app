import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedOut$: Observable<boolean>;
  isLoggedIn$:  Observable<boolean>;

  constructor(private userService: UserService) {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.isLoggedOut$ = this.userService.isLoggedOut$;
  }

  ngOnInit(): void {
  }

  logout() {
    // request to server
    // clean storage
    // emit logged in value
  }
}
