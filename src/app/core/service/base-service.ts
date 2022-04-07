import { Injectable, Inject } from "@angular/core";

import { HttpClientService } from "./http-client.service";

@Injectable()
export class BaseService {
  /**
   * GraphQL apollo client
   */

  constructor(private httpClient: HttpClientService, @Inject(String) private url: string) {}

  /**
   * To fetch item from API endpoint
   * @param path - a string containing path of the URL
   */
  fetch<T>(path: string) {
    return this.httpClient.get<T>(`${this.url}/${path}`);
  }

  /**
   * To save an item on the server
   * @param path - a string containing path of the URL
   * @param data - data to be saved
   */
  add<T>(path: string, data: any) {
    return this.httpClient.post<T>(`${this.url}/${path}`, data);
  }

  /**
   * To update an item on server
   * @param path - a string containing path of the URL
   * @param data - an object having details to be updated
   */
  update<T>(path: string, data: any) {
    return this.httpClient.put<T>(`${this.url}/${path}`, data);
  }

  /**
   * To delete an item from server
   * @param path - a string containing path of the URL
   */
  remove<T>(path: string) {
    return this.httpClient.delete<T>(`${this.url}/$${path}`);
  }
}
