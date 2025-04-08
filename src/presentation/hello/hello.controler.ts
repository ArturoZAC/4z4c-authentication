import { Request, Response } from "express";

export class HelloController {

  //*implementation from repository
  public constructor(){}

  public getMessage(req: Request, res: Response){
    res.status(200).json({message: 'Hello You!!!'})
  }

}