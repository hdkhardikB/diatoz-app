import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from "rxjs";

import { Utility } from "@core/class/utility";

import { ImageDetail } from "@module/image/image";

@Component({
  selector: "app-image-list",
  templateUrl: "./image-list.component.html",
  styleUrls: ["./image-list.component.scss"],
})
export class ImageListComponent implements OnChanges {
  colSize: number = 4;

  @Input() images: ImageDetail[] = [];

  @Input() type: "favourite" | "general";

  @Output() byUnfavouriteClick = new EventEmitter<string>();

  cols_xs: number = 1;

  cols_sm: number = 2;

  cols_md: number = 3;

  cols_lg: number = 4;

  cols_xl: number = 4;

  imageGrid: any[] = [];

  listImages: any[] = [];

  private readonly mediaWatcher: Subscription;

  constructor(media: MediaObserver) {
    this.mediaWatcher = media.media$.subscribe((change: MediaChange) => {
      this.colSize = this[`cols_${change.mqAlias}`];
      this.reRenderImages(this.colSize);
    });
  }

  /**
   * Rerender image based on screen or images change
   * @param col - number of columns to be displayed
   */
  reRenderImages(col: number) {
    this.imageGrid = [];
    const _images = [...this.images];
    for (let x = 0; x < _images.length; x += col) {
      this.imageGrid.push(_images.slice(x, x + col));
    }
    this.listImages = [...Utility.transpose(this.imageGrid)];
  }

  ngOnChanges(changes: any): void {
    if (changes.images) {
      const { currentValue, previousValue } = changes.images;
      if (currentValue != previousValue && currentValue) {
        this.reRenderImages(this.colSize);
      }
    }
  }

  onImageChange($event) {
    this.byUnfavouriteClick.emit($event);
  }
}
