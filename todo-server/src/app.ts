import express from "express";
import cors from "cors";
import router from "./routers/routers";
import "./database"



class App {
  app: any;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares(){
    this.app.use(express.json());
    this.app.use(cors())
  }
  routes(){
    this.app.use(router)
  }
}

export default new App().app;
