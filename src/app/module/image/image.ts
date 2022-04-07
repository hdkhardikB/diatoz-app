import { BaseField, IBaseField } from "src/app/core/class/base-field";
import { Filter } from "src/app/core/class/base-filter";
import { Pagination } from "src/app/core/class/base-pagination";

export interface IImageDetail extends IBaseField {
  id: string;

  downloadUrl: string;

  url: string;

  author: string;

  height: number;

  width: number;
}

export class ImageDetail extends BaseField implements IImageDetail {
  id: string;

  downloadUrl: string;

  url: string;

  author: string;

  height: number;

  width: number;

  isFavourite: boolean;
}

export class ImageListFilter extends Filter {}

export interface IImageListResult {
  data: ImageDetail[];
  pagination: Pagination;
}
