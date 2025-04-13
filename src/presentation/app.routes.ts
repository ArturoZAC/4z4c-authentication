import { Router } from "express";
import { AuthRoute } from "./auth/auth.route";
import { CategoryRoute } from "./category/category.route";
import { ProductRoute } from "./products/product.route";

export class AppRoutes {

  public static routes() {

    const router = Router();

    router.use('/api/auth', AuthRoute.route() )
    router.use('/api/categories', CategoryRoute.route() )
    router.use('/api/products', ProductRoute.route() )

    return router;
  }


}