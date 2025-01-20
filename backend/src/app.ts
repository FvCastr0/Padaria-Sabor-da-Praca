import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";

dotenv.config();

class App {
  app: Express;
  constructor() {
    this.app = express();
    this.routes();
    this.middlewares();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/", (req: express.Request, res: express.Response) => {
      res.status(200).send({ msg: "Olá" });
    });
  }
}

export default new App().app;
