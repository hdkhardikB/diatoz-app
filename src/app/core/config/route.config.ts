import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class RouteConfig {
  Url(url): string {
    return `${environment.ApiUrl.toString()}/${url}`;
  }
}
