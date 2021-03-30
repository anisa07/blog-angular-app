import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {

  constructor() { }

  setData(key: string, value: string | Object) {
    console.log(value)
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
}
