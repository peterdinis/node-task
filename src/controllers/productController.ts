import { Request, Response } from 'express';
import { Product } from '../interfaces/productInterface';
import { fetchProducts } from '../services/productsService';


// controller for getting all products

export const getProducts = async (req: Request, res: Response) => {
    const minPrice = parseFloat(req.query.minPrice as string) || 0;
    const maxPrice = parseFloat(req.query.maxPrice as string) || 100000;

    let totalProducts = 0;
    let allProducts: Product[] = [];

    const applicationProducts = async (minPrice: number, maxPrice: number) => {
        const data = fetchProducts(minPrice, maxPrice);
        totalProducts = data.total;

        allProducts.push(...data.products);

        if (data.count === 1000) {
            const midPrice = (minPrice + maxPrice) / 2;
            await applicationProducts(minPrice, midPrice);
            await applicationProducts(midPrice + 1, maxPrice);
        }
    };

    await applicationProducts(minPrice, maxPrice);

    res.json({
        total: totalProducts,
        count: allProducts.length,
        products: allProducts
    });
};