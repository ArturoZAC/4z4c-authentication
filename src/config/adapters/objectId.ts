import mongoose from "mongoose"

export const ObjectId = {

  isMongoID: ( id: string ) => {
    return mongoose.isValidObjectId( id );
  }
}