import { Injectable } from '@angular/core';

const TOKEN = 'NeoTOKEN';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}
