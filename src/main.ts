import express from 'express';
import productRoutes from "./routes/productRouter";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT as unknown as number || 4000;

app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});