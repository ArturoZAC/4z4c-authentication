import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRoute {

  public static route() {

    const router = Router();
    const authController = new AuthController();

    router.post('/login', authController.loginUser )
    router.post('/register', authController.registerUser )
    router.get('/validate-email/:token', authController.validateEmail )

    return router;
  }


}