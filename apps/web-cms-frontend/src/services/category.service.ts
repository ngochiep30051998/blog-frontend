import { HTTP } from '@blog-frontend/core';
import {
  IResponse,
  ICategory,
  ICreateCategoryDto,
  IUpdateCategoryDto,
  ICategoryFilter,
} from '@blog-frontend/shared';

const API_URL = '/posts/categories';

export const categoryService = {
  /**
   * Get all categories
   */
  getAll: async (params?: ICategoryFilter): Promise<IResponse<ICategory[]>> => {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));
    if (params?.parentId) queryParams.append('parentId', params.parentId);
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    const url = queryParams.toString() ? `${API_URL}?${queryParams.toString()}` : API_URL;
    return HTTP.get(url);
  },

  /**
   * Get category by ID
   */
  getById: async (id: string): Promise<IResponse<ICategory>> => {
    return HTTP.get(`${API_URL}/${id}`);
  },

  /**
   * Create new category
   */
  create: async (data: ICreateCategoryDto): Promise<IResponse<ICategory>> => {
    return HTTP.post(API_URL, data);
  },

  /**
   * Update category
   */
  update: async (id: string, data: IUpdateCategoryDto): Promise<IResponse<ICategory>> => {
    return HTTP.put(`${API_URL}/${id}`, data);
  },

  /**
   * Delete category
   */
  delete: async (id: string): Promise<IResponse<void>> => {
    return HTTP.delete(`${API_URL}/${id}`);
  },

};

export default categoryService;
