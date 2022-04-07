import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class Login implements ILogin {
  email: string;

  password: string;

  /**
   * Form
   */
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  /**
   * Create forn by builder
   */
  createForm() {
    this.form = this._formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  get(data: ILogin) {
    this.email = data.email;
    this.password = data.password;
    this.createForm();
    this.form.patchValue(this);
    return this;
  }
}

@Injectable({
  providedIn: "root",
})
export class SignUp implements ISignUp {
  name: string;

  email: string;

  password: string;

  /**
   * Form
   */
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  /**
   * Create forn by builder
   */
  createForm() {
    this.form = this._formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
    });
  }

  get(data: ISignUp) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.createForm();
    this.form.patchValue(this);
    return this;
  }
}
