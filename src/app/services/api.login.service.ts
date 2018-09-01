import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { LoginResultModel } from '../model/loginResult.model';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>('https://reqres.in/api/login', {
      email: email,
      password: password
    });
  }
}
