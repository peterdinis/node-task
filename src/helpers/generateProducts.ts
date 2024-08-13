import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    rating: number;
}

function generateProducts(): Product[] {
    const products: Product[] = [];

    for (let i = 0; i < 1000; i++) {
        const product: Product = {
            id: uuidv4(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.number.int({ min: 1, max: 1000 }),
            category: faker.commerce.department(),
            stock: faker.number.int({ min: 0, max: 1000 }),
            rating: faker.number.float({ multipleOf: 0.1 })
        };
        products.push(product);
    }

    return products;
}

const products = generateProducts();

fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf-8');