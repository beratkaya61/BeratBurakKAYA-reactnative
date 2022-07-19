import http from '../common/http-common';
import Category from '../types/Category.type';

class CategoryDataService {
    getAll() {
        return http.get<Category[]>('/categories');
    }

    get(id: string) {
        return http.get(`/categories/${id}`);
    }
}

export default new CategoryDataService();
