import { ProductModel } from "../../data";
import { CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';

export class ProductService {

  public createProduct = async( createProductDto: CreateProductDto ) => {

    const productExists = await ProductModel.findOne({ name: createProductDto.name });
    if( productExists ) throw CustomError.badRequest( 'Product already Exits' );

    try {
      const product = new ProductModel(createProductDto);
      
      await product.save();

      return product;

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  public getproducts = async(paginationDto: PaginationDto) => {
    
    const { page, limit } = paginationDto;

    try {
      
      const total = await ProductModel.countDocuments();
      const products = await ProductModel.find()
        .skip( (page - 1) * limit)
        .limit( limit )
        .populate('user')
        .populate('category')

      return {
        page: page,
        limit: limit,
        total: total,
        next: total < page ? `/api/products?page=${page + 1}&limit=${limit}`: null,
        prev: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products
      }
      
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }

  }

} 