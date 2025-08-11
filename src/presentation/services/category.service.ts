import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";

export class CategoryService {

  public createCategory = async( createCategoryDto: CreateCategoryDto, user: UserEntity ) => {

    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
    if( categoryExists ) throw CustomError.badRequest( 'Category already exists' );

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      })
      
      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  public getCategories = async(paginationDto: PaginationDto) => {
    
    const { page, limit } = paginationDto;

    try {
      
      const total = await CategoryModel.countDocuments();
      const categories = await CategoryModel.find()
        .skip( (page - 1) * limit)
        .limit( limit )

      return {
        page: page,
        limit: limit,
        total: total,
        next: total < page ? `/api/categories?page=${page + 1}&limit=${limit}`: null,
        prev: page > 1 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        categories: categories.map( category => {
          return {
            id: category.id,
            name: category.name,
            available: category.available,
          }
        })
      }
      
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}