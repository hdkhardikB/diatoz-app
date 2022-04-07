import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { RouteConfig } from "../config/route.config";

export interface IRequestOptions {
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
  params?: HttpParams | { [param: string]: string | Array<string> };
  reportProgress?: boolean;
  responseType?: "arraybuffer" | "blob" | "json" | "text";
  withCredentials?: boolean;
}

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient, private routeConfig: RouteConfig) {}

  /**
   * Make http GET request
   * @param url - URL of the server
   */
  get<T>(url: string) {
    return this.http.get<T>(this.routeConfig.Url(url));
  }

  /**
   * Make http POST request
   * @param url - a URL of the server where request needs to be made
   * @param data - Data to be sent over the request
   */
  post<T>(url: string, data: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    const httpOptions = { headers: headers };
    //let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(data);

    return this.http.post<T>(this.routeConfig.Url(url), body, httpOptions);
  }

  /**
   * Make http PUT request
   * @param url - URL of the server
   * @param data - Data to be sent over request
   */
  put<T>(url: string, data: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers };
    let body = JSON.stringify(data);

    return this.http.put<T>(this.routeConfig.Url(url), body, options);
  }

  /**
   * Makes an HTTP delete request
   * @param url - a URL of the API server
   */
  delete<T>(url: string) {
    return this.http.delete<T>(this.routeConfig.Url(url));
  }
}
