import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseComponent } from "@core/class/base-component";
import { OrderBy } from "@core/class/base-filter";
import { Utility } from "@core/class/utility";
import { IImageListResult, ImageDetail, ImageListFilter } from "../image";
import { ImageService } from "../image.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent extends BaseComponent implements OnInit {
  public allImages: ImageDetail[] = [];

  public imageList: ImageDetail[] = [];

  filter: ImageListFilter;

  hasMoreRecords: boolean = true;

  constructor(private imageService: ImageService, private _snackBar: MatSnackBar) {
    super(_snackBar);
    this.imageList = [];
  }

  ngOnInit(): void {
    this.initialization();
  }

  initialization() {
    this.initializeFilters();
    this.getAllImages();
  }

  /**
   * To initalise filters
   */
  initializeFilters() {
    this.filter = new ImageListFilter();
    this.filter.sortOrder = OrderBy.ASC;
    this.filter.sortBy = "author";
    this.filter.pageSize = 10;
  }

  /**
   * To get all images
   */
  getAllImages() {
    this.isLoading = true;
    this.imageService.getImageList<IImageListResult>(this.filter).subscribe({
      next: (result) => {
        this.allImages = [...this.allImages].concat(
          result.data.map((image) => Utility.transformToCamelCase(image)),
        );

        this.imageList = [...this.allImages];
        const { pageSize, page, total } = Utility.transformToCamelCase(result.pagination);
        this.hasMoreRecords = pageSize * page < total;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        return this.showError(e.message, "X");
      },
    });
  }

  /**
   * To trigger an event on scroll
   */
  onScroll() {
    if (!this.hasMoreRecords || this.isLoading) return;
    this.filter.page += 1;
    this.getAllImages();
  }

  /**
   * On favourite clicked
   * @param $event
   */
  onFavouriteClick($event) {
    this.allImages = this.allImages.map((item) => {
      item.isFavourite = item.id === $event;
      return item;
    });

    this.imageList = [...this.allImages];
  }
}
