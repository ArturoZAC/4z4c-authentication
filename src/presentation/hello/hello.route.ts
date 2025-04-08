import { Router } from "express";
import { HelloController } from "./hello.controler";

export class HelloRoutes {
 
  public static routes() {

    const router = Router();
    const helloController = new HelloController();

    router.get('/', helloController.getMessage );
    return router;
  }


}