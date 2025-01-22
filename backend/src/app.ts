import rawMaterialRoutes from "@routes/raw-material-routes";
import supplierRoutes from "@routes/supplier-routes";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";

dotenv.config();

class App {
  app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/supplier", supplierRoutes);
    this.app.use("/rawMaterial", rawMaterialRoutes);
  }
}

export default new App().app;
