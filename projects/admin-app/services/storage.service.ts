import { Injectable } from '@angular/core';

const ADMIN_KEY = 'auth-admin';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(ADMIN_KEY);
    window.localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(ADMIN_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(ADMIN_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
