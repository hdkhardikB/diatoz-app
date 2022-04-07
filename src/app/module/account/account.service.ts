import { Injectable } from "@angular/core";
import { Api } from "src/app/core/class/api";
import { RouteConfig } from "src/app/core/config/route.config";
import { AuthService } from "src/app/core/service/auth.service";
import { BaseService } from "src/app/core/service/base-service";
import { HttpClientService } from "src/app/core/service/http-client.service";

@Injectable()
export class AccountService extends BaseService {
  constructor(
    private _httpClient: HttpClientService,
    private _routeConfig: RouteConfig,
    private _auth: AuthService,
  ) {
    super(_httpClient, Api.Auth);
  }
}
