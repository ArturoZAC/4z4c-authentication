import { z } from "zod";

type props =  z.infer< typeof RegisterUserDto.schema>

export class RegisterUserDto {

  private constructor(
    public readonly props: props
  ){}

  public static schema = z.object({
    name: z
      .string({ message: 'Name must be a string' })
      .min(1, { message: 'Name is required' }),
    email: z
      .string({ message: 'Email must be a string' })
      .email({ message: 'Invalid email format' }).min(1, { message: 'Email is required' }),
    password: z
      .string({ message: 'Password must be a string' })
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password too short' })
  });


  public static create(object: z.infer< typeof this.schema> ): [string?, RegisterUserDto?] {

    const result = this.schema.safeParse(object);

    if( !result.success ){
      const firstError = result.error.errors[0];
      const customMessage = firstError.message === 'Required'
                              ? 'Request body is missing'
                              : firstError.message

      return [ customMessage, undefined ]
    }

    return [undefined, new RegisterUserDto(result.data)]
  }

};