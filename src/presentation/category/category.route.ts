import { Router } from "express";
import { CategoryController } from "./category.controller";

export class CategoryRoute {

  public static  route() {
    
    const router = Router();
    const categoryController = new CategoryController();

    router.get('/',  categoryController.getCategories )
    router.post('/',  categoryController.createCategory )

    return router;
  }


}