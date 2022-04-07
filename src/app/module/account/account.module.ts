import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { LoginComponent } from "./login/login.component";
import { ErrorMessage } from "src/app/core/service/error-message.service";
import { AccountService } from "./account.service";
import { SignupComponent } from "./signup/signup.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

export const ROUTES: Routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoginComponent, SignupComponent],
  providers: [AccountService, ErrorMessage],
})
export class AccountModule {}
