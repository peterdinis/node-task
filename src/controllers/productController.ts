import { Request, Response } from 'express';
import { Product } from '../interfaces/productInterface';
import { fetchProducts } from '../services/productsService';

// controller for getting all products
export const getProducts = async (req: Request, res: Response) => {
    // Validate query parameters
    const allowedParams = ['minPrice', 'maxPrice'];
    const queryParams = Object.keys(req.query);
    
    const invalidParams = queryParams.filter(param => !allowedParams.includes(param));

    if (invalidParams.length > 0) {
        return res.status(400).json({
            error: `Invalid query parameters: ${invalidParams.join(', ')}. Only ${allowedParams.join(', ')} are allowed.`
        });
    }

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