// Category Entity
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  level: number;
  color?: string;
  icon?: string;
  coverImageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  sortOrder: number;
  isActive: boolean;
  postCount: number;
  totalViews: number;
  schema?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// Category DTO for creating
export interface ICreateCategoryDto {
  name: string;
  description?: string;
  parentId?: string;
  color?: string;
  icon?: string;
  coverImageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  sortOrder?: number;
  isActive?: boolean;
}

// Category DTO for updating
export interface IUpdateCategoryDto extends Partial<ICreateCategoryDto> {}

// Category Meta Information
export interface ICategoryMeta {
  timestamp: string;
  level: number;
  hasParent: boolean;
}

// Categories List Meta Information
export interface ICategoriesListMeta {
  timestamp: string;
  total: number;
  page?: number;
  limit?: number;
}

// Query filter for categories
export interface ICategoryFilter {
  search?: string;
  isActive?: boolean;
  parentId?: string;
  page?: number;
  limit?: number;
}

// Upload image response
export interface IUploadImageResponse {
  url: string;
  publicId?: string;
}
