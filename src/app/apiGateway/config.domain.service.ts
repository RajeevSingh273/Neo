import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { ConfigurationModel } from '../model/configuration.model';
import { RequestOptions } from '@angular/http';

const API_URL = 'https://em6cjulwtf.execute-api.ap-south-1.amazonaws.com/NeoApi/';

@Injectable()
export class ConfigDomainService {
    constructor(private http: HttpClient) { }

    saveConfig(configuration: ConfigurationModel) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const options = { headers: headers };
        return this.http.post(API_URL + 'neoapp-pm-config', configuration, options);
    }

    getConfig(): any {
        return this.http.get(API_URL + 'neoapp-pm-config');
    }

    editConfig(user: ConfigurationModel) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        return this.http.put(API_URL + 'neoapp-pm-config', user, options);
    }

    deleteConfig(configIds: string[]) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        return this.http.delete(API_URL + 'neoapp-pm-config?configIds=' + configIds, options);
    }

    getCommodity(): any {
        return this.http.get(API_URL + 'neoapp-pm-commodity');
    }

    getCategory(): any {
        return this.http.get(API_URL + 'neoapp-pm-category');
    }

    getThreshold(): any {
        return this.http.get(API_URL + 'neoapp-pm-threshold');
    }

    Auth(): any {
        return this.http.get(API_URL + 'neoapp-pm-auth');
    }
}
