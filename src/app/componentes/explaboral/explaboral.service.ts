import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpLaboral } from './explaboral';

@Injectable({providedIn:'root'})

export class ExpLaboralService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor (private http: HttpClient){ }

    public getExpLaboral(): Observable<ExpLaboral[]>{
        return this.http.get<ExpLaboral[]>(`${this.apiServerUrl}/explaboral/all`); 
    }

    public addExpLaboral(explaboral :ExpLaboral): Observable<ExpLaboral>{
        return this.http.post<ExpLaboral>(`${this.apiServerUrl}/explaboral/add`, explaboral);
    }

    public updateExpLaboral(explaboral :ExpLaboral): Observable<ExpLaboral>{
        return this.http.put<ExpLaboral>(`${this.apiServerUrl}/explaboral/update`, explaboral);
    }

    public deleteExpLaboral(explaboralId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/explaboral/delete/${explaboralId}`);
    }
}