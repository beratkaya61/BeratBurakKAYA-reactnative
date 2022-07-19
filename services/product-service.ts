import http from '../common/http-common';
import Product from '../types/Product.type';

class ProductDataService {
    getAll() {
        return http.get<Product[]>('/products');
    }

    get(id: string) {
        return http.get(`/products/${id}`);
    }

    create(data: Product) {
        return http.post('/products', data);
    }
}

export default new ProductDataService();
