import { MatSnackBar } from "@angular/material/snack-bar";

export class BaseComponent {
  public isLoading: boolean;

  constructor(private snackBar: MatSnackBar) {}

  /**
   * To show a success message on toaster
   * @param message - a message to be shown
   */
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: "green-snackbar",
    });
  }

  /**
   * To show an error message on toaster
   * @param message - a message to be shown on error box
   */
  showError(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
      panelClass: "red-snackbar",
    });
  }
}
