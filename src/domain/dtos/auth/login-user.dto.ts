import { z } from "zod";

export class LoginUserDto {

  private constructor(
    public email: string,
    public password: string,
  ){}

  public static schema = z.object({
    email: z
      .string({ message: 'Email is required' })
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    password: z
      .string({ message: 'Password is required' })
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password too short' })
  });

  public static create(object: z.infer< typeof this.schema> ): [string?, LoginUserDto?] {

    const result = this.schema.safeParse(object);

    if( !result.success ){
      const customMessage = result.error.errors[0].message === 'Required'
                              ? `name is required`
                              : result.error.errors[0].message

      return [ customMessage, undefined ]
    }

    const {email, password} = result.data;
    return [undefined, new LoginUserDto(email, password)]
  }

};