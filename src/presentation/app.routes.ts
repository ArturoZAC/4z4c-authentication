import { Router } from "express";
import { HelloRoutes } from "./hello/hello.route";

export class AppRoutes {

  public static routes() {

    const router = Router();

    router.use('/api/hello', HelloRoutes.routes() )
    return router;
  }


}