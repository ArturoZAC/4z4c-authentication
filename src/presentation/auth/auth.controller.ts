import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";

export class AuthController {

  public constructor(){}

  public registerUser (req: Request, res: Response) {
    const registerDto = RegisterUserDto.create( req.body );

    res.json(registerDto);
  }

  public loginUser (req: Request, res: Response) {
    res.json({message: 'loginUser'})
  }
  
  public validateEmail (req: Request, res: Response) {
    res.json({message: 'validateEmail'})
  }

};