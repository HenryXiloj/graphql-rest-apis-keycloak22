import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, public router: Router) { }

  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', environment.grant_type);
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(environment.client_ID+':'+environment.client_secret) // Replace with your client ID and secret
    });

    return this.http.post(environment.keycloakEndpoint, body.toString(), { headers })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  user(): string {
    const payload = this.getDataToken(this.token);
    return payload.preferred_username;
  }

  public get token(): string {

    let resul: any;

    if (localStorage.getItem('token') != null) {
      resul = localStorage.getItem('token');
    }
    return resul;
  }

  saveToken(accessToken: string): void {
    localStorage.setItem('token', accessToken);
  }

  getUser() {
    const payload = this.getDataToken(this.token);
    return payload.name
  }

  getDataToken(accessToken: string): any {
    if (accessToken != null) {

      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.getDataToken(this.token);
    if (payload != null && payload.preferred_username && payload.preferred_username.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
  }
}
