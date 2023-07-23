import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrahpqlService {

  constructor(private http: HttpClient) { }

  getName(): Observable<any> {
    const query = `
    query {
      getName
    }
    `;
    return this.http.post<any>(environment.graphql_api, { query });
  }

  getJWTByUser(): Observable<any> {
    const query = `
    query {
      getJWTByUser {
      sub
      resourceAccess {
      account {
      roles
      }
      additionalProperties
      }
      emailVerified
      allowedOrigins
      iss
      typ
      preferredUsername
      givenName
      sid
      aud
      acr
      realmAccess {
      roles
      additionalProperties
      }
      azp
      scope
      name
      exp
      sessionState
      iat
      familyName
      jti
      email
      additionalProperties
      }
      }
    `;
    return this.http.post<any>(environment.graphql_api, { query });
  }
}
