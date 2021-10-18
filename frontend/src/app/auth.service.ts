import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = localStorage.getItem('token');

  constructor() { }

  getToken() {
    return this.auth ? JSON.parse(this.auth).token : null;
  }

  getUserId() {
    return this.auth ? JSON.parse(this.auth).userId : null;
  }
}
