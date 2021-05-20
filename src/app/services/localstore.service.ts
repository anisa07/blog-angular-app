import { Injectable } from '@angular/core';
import {APP_THEME, POSTS_VIEW} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {

  constructor() { }

  setData(key: string, value: string | Object) {
    try {
      const val = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, val);
    } catch (e) {
      console.error('Error occurs during conversion JSON to string, ' + e);
    }
  }

  getData(key: string) {
    try {
      const val = localStorage.getItem(key) || '';
      return val.startsWith("{") ? JSON.parse(val) : val;
    } catch (e) {
      console.error('Error occurs during conversion to string to JSON, ' + e);
    }
  }

  deleteItem(key: string) {
    localStorage.removeItem(key);
  }

  getTheme() {
    return this.getData(APP_THEME);
  }

  setTheme(theme: string) {
    this.setData(APP_THEME, theme);
  }

  getPostsView() {
    return this.getData(POSTS_VIEW);
  }

  setPostsView(view: string) {
    return this.setData(POSTS_VIEW, view);
  }
}
