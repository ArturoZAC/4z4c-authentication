import { Router } from "express";
import { AuthRoute } from "./auth/auth.route";

export class AppRoutes {

  public static routes() {

    const router = Router();

    router.use('/api/auth', AuthRoute.route() )



    return router;
  }


}