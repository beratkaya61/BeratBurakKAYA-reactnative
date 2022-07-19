import { RouteProp } from "@react-navigation/native";
import Product from "../types/Product.type";

export type RootStackParamsList = {
    Home: undefined;
    ProductDetail: {
        product: Product;
    };
};

export type ProductDetailProp = RouteProp<RootStackParamsList, 'ProductDetail'>;