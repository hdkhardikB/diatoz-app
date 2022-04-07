import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/core/class/base-component";
import { AuthService } from "src/app/core/service/auth.service";
import { Login, ILogin } from "../account";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public returnUrl: string;

  public loginInvalid: boolean;

  constructor(
    public _snack: MatSnackBar,
    public login: Login,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(_snack);
    this.login.createForm();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home";
    if (this.authService.currentUserValue) {
      this.router.navigate(["/home"]);
    }
  }

  async signIn(loginDetails: ILogin): Promise<void> {
    this.loginInvalid = false;
    if (this.login.form.valid) {
      try {
        this.authService.login(loginDetails.email, loginDetails.password).subscribe({
          next: () => {
            this.router.navigate([this.returnUrl]);
          },
          error: () => {
            this.loginInvalid = true;
          },
        });
      } catch {
        this.loginInvalid = true;
      }
    }
  }
}
