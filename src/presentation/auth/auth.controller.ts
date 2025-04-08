import { Request, Response } from "express";

export class AuthController {

  public constructor(){}

  public registerUser (req: Request, res: Response) {
    res.json({message: 'registerUser'})
  }

  public loginUser (req: Request, res: Response) {
    res.json({message: 'loginUser'})
  }
  
  public validateEmail (req: Request, res: Response) {
    res.json({message: 'validateEmail'})
  }

};