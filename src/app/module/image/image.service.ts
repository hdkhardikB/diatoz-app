import { Injectable } from "@angular/core";
import { Utility } from "@core/class/utility";
import { catchError, map } from "rxjs";
import { Api } from "src/app/core/class/api";
import { BaseService } from "src/app/core/service/base-service";
import { HttpClientService } from "src/app/core/service/http-client.service";
import { ImageListFilter } from "./image";

@Injectable({
  providedIn: "root",
})
export class ImageService extends BaseService {
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

  /**
   * To get list of images from server
   * @param filter - an object having filteration and pagination details
   */
  getImageList<T>(filter: ImageListFilter) {
    const requestQueryString = Utility.serializeQuery(Utility.transformToSnakeCase(filter));
    return this.fetch<T>(`all?${requestQueryString}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }

  /**
   * To get list of images from server
   * @param filter - an object having filteration and pagination details
   */
  getFavouriteImages<T>(filter: ImageListFilter) {
    const requestQueryString = Utility.serializeQuery(Utility.transformToSnakeCase(filter));
    return this.fetch<T>(`favourites?${requestQueryString}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }
}
