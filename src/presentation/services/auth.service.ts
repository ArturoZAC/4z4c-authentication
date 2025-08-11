import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {

  public constructor(
    private readonly emailService: EmailService
  ){}

  public registerUser = async( registerUserDto: RegisterUserDto ) => {

    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if( existUser ) throw CustomError.badRequest('Email already exist');
    
    try {
      const user = new UserModel(registerUserDto);

      user.password = bcryptAdapter.hash( registerUserDto.password );

      await user.save();

      await this.sendEmailValidationLink( user.email! );
      
      const userWith_Id = {
        ...user,
        id: user._id.toString(),
        name: user.name ?? '',  
        email: user.email ?? '',
        password: user.password ?? '',
        img: user.img ?? null,
      };

      const { password, ...userEntity} = UserEntity.fromObject( userWith_Id );
      const token = await JwtAdapter.generateToken({ id: userEntity.id })
      if ( !token ) throw CustomError.internalServer('Error while creating JWT')

      return {
        user: userEntity,
        token: token
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`)      
    }
  }

  public loginUser = async( loginUserDto: LoginUserDto ) => {

    const user = await UserModel.findOne({ email: loginUserDto.email })
    if( !user ) throw CustomError.badRequest('Email not exist');

    const isMathing = bcryptAdapter.compare( loginUserDto.password, user.password ?? '')
    if( !isMathing ) throw CustomError.badRequest('Password is not valid');

    const userWith_Id = {
      ...user,
      id: user._id.toString(),
      name: user.name ?? '',  
      email: user.email ?? '',
      password: user.password ?? '',
      img: user.img ?? null,
    };

    const { password, ...userEntity} = UserEntity.fromObject( userWith_Id );


    const token = await JwtAdapter.generateToken({ id: userEntity.id })
    if ( !token ) throw CustomError.internalServer('Error while creating JWT')

    return {
      user: userEntity,
      token: token
    }

  }

  private sendEmailValidationLink = async( email: string ) => {

    const token = await JwtAdapter.generateToken({ email: email })
    if ( !token ) throw CustomError.internalServer('Error while creating JWT')

    const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;
    const html = `
      <h1>Validate your email</h1>
      <h1>Click on the following link to validate your email</h1>
      <a href="${ link }">Validate your email: ${ email }</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    }

    const isSend = await this.emailService.sendEmail( options );
    if ( !isSend ) throw CustomError.internalServer('Error Sending email');

    return true;

  }

  public validateEmailService = async(token:string) => {
    const payload = await JwtAdapter.validatedToken(token);
    if ( !payload ) throw CustomError.unAuthorized('Invalid token');

    const { email } = payload as { email: string };
    if ( !email ) throw CustomError.internalServer('Email not in token');

    const user = await UserModel.findOne({ email });
    if ( !user ) throw CustomError.internalServer('Email not exists');

    user.emailValidated = true;
    await user.save();

    return true;
  }


};