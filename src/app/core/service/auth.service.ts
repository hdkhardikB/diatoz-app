import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { ISignUp } from "src/app/module/account/account";
import { Api } from "../class/api";
import { BaseService } from "./base-service";
import { HttpClientService } from "./http-client.service";

export interface ApplicationToken {
  access_token: string;
}

export interface User {
  email: string;
  name: string;
  id: string;
}

@Injectable()
export class AuthService extends BaseService {
  private currentUserSubject: BehaviorSubject<User>;

  public currentUser: Observable<User>;

  private accessTokenSubject: BehaviorSubject<ApplicationToken>;

  public accessToken: Observable<ApplicationToken>;

  constructor(public jwtHelper: JwtHelperService, private _httpClient: HttpClientService) {
    super(_httpClient, Api.Auth);

    // Start - User Object, storage and subject
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")));
    this.currentUser = this.currentUserSubject.asObservable();
    // End - User Object, storage and subject

    // Start - Access token and subject
    this.accessTokenSubject = new BehaviorSubject<ApplicationToken>(
      JSON.parse(localStorage.getItem("access_token")),
    );
    this.accessToken = this.accessTokenSubject.asObservable();
    // End - Access token and subject
  }

  /**
   * Gets logged in user
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Gets logged in user token
   */
  public get currentUserToken(): ApplicationToken {
    return this.accessTokenSubject.value;
  }

  // remove user from local storage to log user out
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    this.currentUserSubject.next(null);
    this.accessTokenSubject.next(null);
  }

  /**
   * Get access token from local storage
   */
  static getToken(): string {
    return localStorage.getItem("access_token");
  }

  /**
   * Removed access token from local storage
   */
  static removeToken(): void {
    localStorage.removeItem("access_token");
  }

  /**
   * Check if authentication token is valid or not
   */
  public isAuthenticated(): boolean {
    const token = this.currentUserToken && this.currentUserToken.access_token;
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  /**
   * Gets user profile info
   */
  checkAuth() {
    return this._httpClient.get("auth/me").pipe(
      map((user: User) => {
        if (user && user.email) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }),
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }

  /**
   * To create a user
   * @param signup - an object having signup information
   */
  signUp(signup: ISignUp) {
    try {
      return this._httpClient
        .post<{ email: string; id: string; name: string }>("auth/register", { ...signup })
        .pipe(
          map((user) => user),
          catchError((error) => {
            throw new Error(error);
          }),
        );
    } catch (e) {
      throw e;
    }
  }

  /**
   * To login to the system
   * @param email - an email part of the credentials
   * @param password - password
   */
  login(email: string, password: string) {
    try {
      return this._httpClient
        .post<{ email: string; access_token: string }>("auth/login", { email, password })

        .pipe(
          map((user) => {
            if (user && user.access_token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem("access_token", JSON.stringify(user));
              this.accessTokenSubject.next(user);
            }

            return user;
          }),
          catchError((error) => {
            throw new Error(error);
          }),
        );
    } catch (e) {
      throw e;
    }
  }
}
