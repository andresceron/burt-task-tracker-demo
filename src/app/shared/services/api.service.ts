import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'api/';

  constructor(
    private http: HttpClient
  ) { }

  public get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + path);
  }

  public post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + path, data);
  }

  public delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + path);
  }
}
