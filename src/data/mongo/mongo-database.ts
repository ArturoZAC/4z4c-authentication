import mongoose from "mongoose";
import { envs } from "../../config";

export class MongoDatabase {

  static async connect () {

    try {
      await mongoose.connect( envs.URL, {
        dbName: envs.DBNAME
      })

      console.log('Connected');
      return true;
      
    } catch (error) {
      console.log('Error al conectar con mongo');
      throw error;
    }

  }

  static async disconnect(){
    await mongoose.disconnect();
  }

};