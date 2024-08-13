import * as fs from 'fs';
import { Product } from '../interfaces/productInterface';

/* Service for fetching products */

const products: Product[] = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

if(!products) {
    throw new Error("No products!. Run script for seeding data for products in package.json");
}

export function fetchProducts(minPrice: number, maxPrice: number): { total: number; count: number; products: Product[] } {
    const filteredProducts = products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
    );

    return {
        total: filteredProducts.length,
        count: Math.min(filteredProducts.length, 1000),
        products: filteredProducts.slice(0, 1000),
    };
}