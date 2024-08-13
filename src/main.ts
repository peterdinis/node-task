import express, { Application } from 'express';
import productRoutes from "./routes/productRouter";

const app: Application = express();

const PORT = 4000;

app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});