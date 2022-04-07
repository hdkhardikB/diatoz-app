import { Routes, RouterModule } from "@angular/router";

import { DashboardLayoutComponent } from "@core/layout/dashboard-layout/dashboard-layout.component";
import { AuthGuard } from "@core/service/auth-guard.service";
import { LoggedInAuthGuard } from "@core/service/logged-in.guard.service";

const appRoutes: Routes = [
  { path: "", redirectTo: "account/login", pathMatch: "full" },

  //No layout routes : start
  {
    path: "account",
    loadChildren: () =>
      import("src/app/module/account/account.module").then((m) => m.AccountModule),
    canActivate: [LoggedInAuthGuard],
  },
  //No layout routes : End

  //User Dashboard layout : Start
  {
    path: "",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("src/app/module/image/image.module").then((m) => m.ImageModule),
        canActivate: [AuthGuard],
        data: {},
      },
    ],
  },

  //Home Layout : End

  // otherwise redirect to Login
  {
    path: "**",
    loadChildren: () =>
      import("src/app/module/account/account.module").then((m) => m.AccountModule),
  },
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });
