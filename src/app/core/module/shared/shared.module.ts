import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

import { ImageListComponent } from "@core/components/image-list/image-list.component";
import { ImageCardComponent } from "@core/components/image-card/image-card.component";

@NgModule({
  declarations: [ImageListComponent, ImageCardComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [ImageCardComponent, ImageListComponent],
})
export class SharedModule {}
