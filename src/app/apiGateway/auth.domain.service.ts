import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { ConfigurationModel } from '../model/configuration.model';
import { RequestOptions } from '@angular/http';

const API_URL = 'https://emcadtlwtf.execute-api.ap-south-1.amazonaws.com/NeoApi/';

@Injectable()
export class AuthDomainService {
    constructor(private http: HttpClient) { }

    Auth(): any {
        return this.http.get(API_URL + 'neoapp-pm-auth');
    }
}
