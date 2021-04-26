import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {StoreService} from '../services/store.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedOut$: Observable<boolean>;
  isLoggedIn$:  Observable<boolean>;

  constructor(private storeService: StoreService) {
    this.isLoggedIn$ = this.storeService.isLoggedIn$;
    this.isLoggedOut$ = this.storeService.isLoggedOut$;
  }

  ngOnInit(): void {
  }

  logout() {
    // request to server
    // clean storage
    // emit logged in value
  }
}
