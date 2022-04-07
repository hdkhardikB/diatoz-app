export enum OrderBy {
  ASC = "ASC",
  DESC = "DESC",
}

export class Filter {
  page: number = 1;

  pageSize: number = 10;

  currPage: number = 1;

  total: number = 0;

  sortOrder: OrderBy;

  sortBy: string;
}
