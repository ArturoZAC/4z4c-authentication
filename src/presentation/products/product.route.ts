import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductController } from "./product.controller";
import { ProductService } from "../services/product.service";

export class ProductRoute {

  public static route() {
     
    const router = Router();
    const productService = new ProductService();
    const productController = new ProductController( productService);

    router.get('/',  productController.getProducts )
    router.post('/', [ AuthMiddleware.validateJWT ] ,productController.createProduct )

    return router;
  }


}