export interface IBaseField {
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
  sortOrder: number;
}

export class BaseField implements IBaseField {
  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;

  isDeleted: boolean;

  deletedAt: Date;

  sortOrder: number;
}
