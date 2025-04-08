import { z } from "zod";

export class UserEntity {

   constructor(
    public _id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
    public emailValidated?: boolean,
   ){}

   public static schema = z.object({
    _id: z.string({ message: '_id must be a string' }).min(1, { message: '_id is required' }), 
    name: z.string({ message: 'Name must be a string' }).min(1, { message: 'Name is required' }), 
    email: z.string({ message: 'Email must be a string' })
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' }),
    emailValidated: z.boolean({ message: 'emailValidated must be a boolean' }).default(false), 
    password: z.string({ message: 'Password must be a string' }).min(1, { message: 'Password is required' }),
    role: z.array(z.string(), { message: 'Role must be an array of strings' }).min(1,{ message: 'At least one role is required' }).default(['USER_ROLE']), 
    img: z.string({ message: 'Image must be a string' }).nullable(), 
   })

   public static fromObject( object: z.infer< typeof this.schema> ) {

    const result = this.schema.safeParse(object);

    if( !result.success ){
      throw (`${ result.error.errors[0].message}`)
    }

    const {_id,email,emailValidated,img,name,password,role} = result.data;

    // return new UserEntity(_id, name, email, emailValidated,password,role,img);
   }
   
};
