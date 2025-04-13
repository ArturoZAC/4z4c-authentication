import { z } from "zod"
import { ObjectId } from "../../../config/adapters/objectId";

export class CreateProductDto {

  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly category: string, //ID
    public readonly user: string, //ID
  ){}

  public static schema = z.object({
    name: z
      .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      })
      .nonempty('name cannot be empty'),
    category: z
      .string({ message: 'category is required'})
      .nonempty('category cannot be empty')
      .refine( value => {
        return ObjectId.isMongoID( value )
      }, { message: 'category must be a valid ID' }),
    user: z
      .string({message: 'user is required'})
      .nonempty('user cannot be empty')
      .refine( value => {
        return ObjectId.isMongoID( value )
      }, { message: 'user must be a valid ID' }),

    available: z.boolean().optional().default(false),
    price: z.number().optional().default(0),
    description: z.string().optional().default(""),
  });
  

  public static create = ( object: z.infer< typeof this.schema>): [string?, CreateProductDto?] => {

    const result = this.schema.safeParse(object);

    if( !result.success ){
      const customMessage = result.error.errors[0].message === 'Required'
                              ? 'name is required'
                              : result.error.errors[0].message;
      return [ customMessage, undefined ];
    }

    const { name,available, price, description, category, user } = result.data;

    return [undefined, new CreateProductDto(name , available, price, description, category, user)];
  } 

};