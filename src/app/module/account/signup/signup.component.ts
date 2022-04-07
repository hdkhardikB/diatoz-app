import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/core/class/base-component";
import { AuthService } from "src/app/core/service/auth.service";
import { ISignUp, SignUp } from "../account";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent extends BaseComponent implements OnInit {
  public returnUrl: string;

  public signupInvalid: boolean;

  constructor(
    public _snack: MatSnackBar,
    public signup: SignUp,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(_snack);
    this.signup.createForm();
  }

  ngOnInit(): void {}

  /**
   * To create an account into sytem
   * @param signupDetails - an object of signinig up user
   */
  async createAccount(signupDetails: ISignUp): Promise<void> {
    this.signupInvalid = false;
    if (this.signup.form.valid) {
      try {
        this.authService.signUp({ ...signupDetails }).subscribe({
          next: () => {
            this.router.navigate(["/login"]);
          },
          error: () => {
            this.signupInvalid = true;
          },
        });
      } catch {
        this.signupInvalid = true;
      }
    }
  }
}
