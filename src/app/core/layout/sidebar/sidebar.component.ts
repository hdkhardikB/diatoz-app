import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/service/auth.service";
import { routes } from "../routes";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  showMenu = false;

  routes = routes;

  constructor(private authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {}

  onLoggedout() {
    this.authService.logout();
    this.router.navigate(["/account/login"]);
  }
}
