import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "@core/service/auth.service";

@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  sideNavOpened = false;

  sideNavMode: "side" | "over" = "over";

  toolBarHeight = 64;

  isLoading: boolean = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._authService.checkAuth().subscribe({
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {}
}
