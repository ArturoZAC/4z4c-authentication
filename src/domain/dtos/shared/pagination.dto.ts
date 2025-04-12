import { z } from "zod";

export class PaginationDto {

  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ){}
  
  public static schema = z.object({
    page: z
      .coerce
      .number()
      .int()
      .positive({ message: 'Page must be greater than 0' }),
    limit: z
      .coerce
      .number()
      .int()
      .positive({ message: 'Limit must be greater than 0' }),
  })

  public static create = ( object: z.infer< typeof this.schema> ): [ string?, PaginationDto?] => {

    const result = this.schema.safeParse(object);

    if( !result.success ) {
      return [ result.error.errors[0].message, undefined ];
    }

    const { page, limit } = result.data;

    return [undefined, new PaginationDto( page, limit )];
  }

};