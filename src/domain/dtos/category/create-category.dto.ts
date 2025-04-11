import { z } from "zod";

export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
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

  public static create = ( object: z.infer< typeof this.schema> ) => {

    const result = this.schema.safeParse(object);

  }


}