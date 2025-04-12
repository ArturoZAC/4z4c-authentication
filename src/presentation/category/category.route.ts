import { Router } from "express";
import { CategoryController } from "./category.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoute {

  public static  route() {
    
    const router = Router();
    const categoryService = new CategoryService();
    const categoryController = new CategoryController( categoryService );

    router.get('/',  categoryController.getCategories )
    router.post('/', [ AuthMiddleware.validateJWT ] ,categoryController.createCategory )

    return router;
  }


}