import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FavouriteComponent } from "./favourite/favourite.component";
import { ListComponent } from "./list/list.component";
import { SharedModule } from "@core/module/shared/shared.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { RouterModule, Routes } from "@angular/router";

export const ROUTES: Routes = [
  { path: "home", component: ListComponent },
  { path: "favourites", component: FavouriteComponent },
];

@NgModule({
  declarations: [FavouriteComponent, ListComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    SharedModule,
    MatGridListModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
})
export class ImageModule {}
