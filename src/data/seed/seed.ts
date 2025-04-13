import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabase } from "../mongo/mongo-database"
import { seedData } from "./data";

(async() => {

  await MongoDatabase.connect()

  await main();


  await MongoDatabase.disconnect()

})();

const randomBetweenAndX = ( x: number ) => {
  return Math.floor( Math.random() * x )
}

async function main() {

  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany()
  ]);


  const users = await UserModel.insertMany( seedData.users );
  const categories = await CategoryModel.insertMany(
    seedData.categories.map( ( category ) => {
      return {
        ...category,
        user: users[0]._id
      }
    })
  );

  await ProductModel.insertMany(
    seedData.products.map( product => {
      return {
        ...product,
        user: users[ randomBetweenAndX( seedData.users.length - 1)]._id,
        category: categories[ randomBetweenAndX(seedData.categories.length - 1)]._id
      }
    })
  )


}