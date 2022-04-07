import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { BaseComponent } from "@core/class/base-component";
import { ImageSharedService } from "@core/service/image-shared.service";

import { ImageDetail } from "@module/image/image";

@Component({
  selector: "app-image-card",
  templateUrl: "./image-card.component.html",
  styleUrls: ["./image-card.component.scss"],
})
export class ImageCardComponent extends BaseComponent implements OnInit {
  @Input() type: "favourite" | "general";

  @Input() image: ImageDetail;

  @Output() byUnfavouriteClick = new EventEmitter<string>();

  public rows: number = 0;

  showOptions: boolean = false;

  constructor(private _sharedService: ImageSharedService, private _snackBar: MatSnackBar) {
    super(_snackBar);
  }

  ngOnInit(): void {}

  /**
   * Get exectuing function based on type of image page
   * @param imageId - an ID of the image being sent on requets
   * @returns
   */
  markFavourite(imageId: string) {
    return (
      (this.type === "general" && this._sharedService.markImageFavourite(imageId)) ||
      this._sharedService.removeFavourite(imageId)
    );
  }

  /**
   * To mark image as favourite
   * @param image - an image object having image Id
   */
  onMarkFavourite(image: ImageDetail) {
    const message =
      (this.type === "favourite" && "Image was removed from favourite list") ||
      "Image was added to favourite list";

    this.markFavourite(image.id).subscribe({
      next: (result) => {
        if (!result) {
          return this.showError("There was a problem, please try again", "X");
        }
        this.byUnfavouriteClick.emit(image.id);
        return this.showMessage(message, "X");
      },
      error: (e) => {
        return this.showError(e.message, "X");
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
