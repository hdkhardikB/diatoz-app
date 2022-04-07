import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";

import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { RouteConfig } from "@core/config/route.config";
import { LayoutModule } from "@core/layout/layout.module";
import { SharedModule } from "@core/module/shared/shared.module";

import { AuthGuard } from "@core/service/auth-guard.service";
import { AuthService } from "@core/service/auth.service";
import { ErrorMessage } from "@core/service/error-message.service";
import { HttpClientService } from "@core/service/http-client.service";
import { errorInterceptorProvider } from "@core/service/http-interceptor.service";
import { jwtInterceptorProvider } from "@core/service/jwt-interceptor.service";
import { LoggedInAuthGuard } from "@core/service/logged-in.guard.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.WhitelistedDomains,
        disallowedRoutes: environment.BlacklistedDomains,
      },
    }),
    routing,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    LayoutModule,
    SharedModule,
    MatSnackBarModule,
  ],
  providers: [
    jwtInterceptorProvider,
    errorInterceptorProvider,
    HttpClientService,
    RouteConfig,
    AuthService,
    AuthGuard,
    LoggedInAuthGuard,
    ErrorMessage,
  ],
  bootstrap: [AppComponent],
  exports: [LayoutModule],
})
export class AppModule {}
