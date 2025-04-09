import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {

  public constructor(){}

  public registerUser = async( registerUserDto: RegisterUserDto ) => {

    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if( existUser ) throw CustomError.badRequest('Email already exist');
    
    try {
      const user = new UserModel(registerUserDto);

      user.password = bcryptAdapter.hash( registerUserDto.password );

      await user.save();
      
      const userWith_Id = {
        ...user,
        id: user._id.toString(),
        name: user.name ?? '',  
        email: user.email ?? '',
        password: user.password ?? '',
        img: user.img ?? null,
      };

      const { password, ...userEntity} = UserEntity.fromObject( userWith_Id );

      return {
        user: userEntity,
        token: 'ABC'
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


    const token = await JwtAdapter.generateToken({ id: userEntity.id, email: userEntity.email })
    if ( !token ) throw CustomError.internalServer('Error while creating JWT')

    return {
      user: userEntity,
      token: token
    }

  }


};