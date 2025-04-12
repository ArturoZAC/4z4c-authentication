import { z } from "zod";

export class CreateCategoryDto {

  private constructor(
    public readonly name: string,
    public readonly available?: boolean,
  ){}

  public static schema = z.object({
    name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .nonempty('name cannot be empty'),
    available: z
      .boolean({
        invalid_type_error: 'available must be a boolean'
      })
      .optional(),
  })

  public static create = ( object: z.infer< typeof this.schema> ): [ string?, CreateCategoryDto?] => {

    const result = this.schema.safeParse(object);

    if( !result.success ){
      const customError = result.error.errors[0].message === 'Required'
                          ? 'name is required'
                          : result.error.errors[0].message
      return [ customError , undefined ];
    }

    const {name, available} = result.data;

    return [ undefined, new CreateCategoryDto(name, available) ];
  }


}