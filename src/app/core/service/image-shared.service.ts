import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs";

import { Api } from "../class/api";
import { BaseService } from "./base-service";
import { HttpClientService } from "./http-client.service";

@Injectable({
  providedIn: "root",
})
export class ImageSharedService extends BaseService {
  constructor(private _httpClient: HttpClientService) {
    super(_httpClient, Api.Images);
  }

  /**
   * To mark an image as favourite
   * @param imageId - an ID of the image to be marked as favourite
   */
  markImageFavourite<T>(imageId: string) {
    return this.add<T>(`favourite`, { image_id: imageId }).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }

  /**
   * To mark an image as favourite
   * @param imageId - an ID of the image to be marked as favourite
   */
  removeFavourite<T>(imageId: string) {
    return this.update<T>(`remove-favourite`, { image_id: imageId }).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }
}
