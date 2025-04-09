import { envs } from "./config";
import { MongoDatabase } from "./data";
import { AppRoutes } from "./presentation/app.routes";
import { AppServer } from "./presentation/app.server";

(() => {
  App();
})()

async function App() {

  await MongoDatabase.connect();
  const server = new AppServer( envs.PORT , AppRoutes.routes() );
  server.start();
  
}