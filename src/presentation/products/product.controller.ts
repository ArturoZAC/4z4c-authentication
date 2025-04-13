import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";


export class ProductController {

  constructor(
    private readonly productService: ProductService
  ){}

  private handleError = ( error: unknown, res: Response) => {
    if( error instanceof CustomError ){
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({error: 'Internal server error'});
  }

  public createProduct = async(req: Request, res: Response) => {

    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: (req as any).user.id!
    });
    if( error ) return res.status(400).json({ error });

    this.productService.createProduct(createProductDto!)
      .then( category => res.status(201).json(category) )
      .catch( error => this.handleError(error, res) )
  }

  public getProducts = async(req: Request, res: Response) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });	
    if( error ) return res.status(400).json({ error });

    this.productService.getproducts( paginationDto! )
      .then( categories => res.status(200).json(categories) )
      .catch( error => this.handleError(error, res) )
   }

}