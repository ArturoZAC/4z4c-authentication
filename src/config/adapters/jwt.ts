import jwt, { SignOptions } from "jsonwebtoken"
import { envs } from "../envs"

export const JwtAdapter = {

  generateToken: ( payload: any, duration: string = '1d') => {

    return new Promise((resolve, reject) => {
      jwt.sign( payload, envs.JWT_SEED, { expiresIn: duration } as SignOptions, (err, token ) => {
        if ( err ) return reject(null)
        return resolve(token)
      })     
    })
  }



}