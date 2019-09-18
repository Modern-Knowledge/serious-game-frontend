import { Injectable, Inject } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from 'src/lib/models/User';
@Injectable()
export class AuthService {
  user: User;
  helper = new JwtHelperService();
  redirectUrl: string;
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post<User>("login", { email: email, password: password });
  }

  register(user: User): Observable<User>{
    return this.httpClient.post<User>('register', user);
  }

  getRelatedUser(): Observable<User> {
    return this.httpClient.get<User>(`users/related`);
  }
  getToken(): string {
    const token = localStorage.getItem("accessToken");
    return token ? token : null;
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem("accessToken");
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  getUserIdFromToken() {
    if (this.isLoggedIn()) {
      return this.helper.decodeToken(this.getToken()).id;
    }
  }
}
