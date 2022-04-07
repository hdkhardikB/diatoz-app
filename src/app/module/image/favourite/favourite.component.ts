import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseComponent } from "@core/class/base-component";
import { OrderBy } from "@core/class/base-filter";
import { Utility } from "@core/class/utility";
import { IImageListResult, ImageDetail, ImageListFilter } from "../image";
import { ImageService } from "../image.service";

@Component({
  selector: "app-favourite",
  templateUrl: "./favourite.component.html",
  styleUrls: ["./favourite.component.scss"],
})
export class FavouriteComponent extends BaseComponent implements OnInit {
  public allImages: ImageDetail[] = [];

  favouriteImages: ImageDetail[] = [];

  filter: ImageListFilter;

  hasMoreRecords: boolean = true;

  constructor(private _snackBar: MatSnackBar, private imageService: ImageService) {
    super(_snackBar);
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.initialization();
  }

  initialization() {
    this.initializeFilters();
    this.getAllFavouriteImages();
  }

  /**
   * To initialise all filter
   */
  initializeFilters() {
    this.filter = new ImageListFilter();
    this.filter.sortOrder = OrderBy.ASC;
    this.filter.sortBy = "author";
    this.filter.pageSize = 10;
  }

  /**
   * Get and render all images
   */
  getAllFavouriteImages() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.imageService.getFavouriteImages<IImageListResult>(this.filter).subscribe({
      next: (result) => {
        this.allImages = [...this.allImages].concat(
          result.data.map((image) => Utility.transformToCamelCase(image)),
        );

        this.favouriteImages = [...this.allImages];
        const { pageSize, page, total } = Utility.transformToCamelCase(result.pagination);
        this.hasMoreRecords = pageSize * page < total;
      },
      error: (e) => {
        this.isLoading = false;
        return this.showError(e.message, "X");
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /**
   * To trigger an event on scroll
   */
  onScroll() {
    if (!this.hasMoreRecords) return;
    this.filter.page += 1;
    this.getAllFavouriteImages();
  }

  /**
   * To remove favourite marked item from favourite list
   * @param $event - an index of the item being removed
   */
  onFavouriteImageRemoved($event) {
    this.allImages = this.allImages.filter((item) => item.id !== $event);
    this.favouriteImages = [...this.allImages];
  }
}
