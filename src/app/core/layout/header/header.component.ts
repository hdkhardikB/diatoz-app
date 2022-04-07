import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "@core/service/auth.service";
import { User } from "@core/class/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  private userSubscription: Subscription;

  @Output() sideNavToggled = new EventEmitter<void>();

  user: User;

  headerUserName: string = "";

  constructor(private readonly router: Router, private authService: AuthService) {
    this.userSubscription = this.authService.currentUser.subscribe((detail) => {
      this.user = detail;
      this.headerUserName =
        (this.user &&
          this.user.name
            .split(" ")
            .map((n) => n[0])
            .join(" ")) ||
        "";
    });
  }

  ngOnInit() {}

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

  onLoggedout() {
    this.authService.logout();
    this.router.navigate(["/account/login"]);
  }
}
