import { serviceTemplate } from "@entities/service-template";
import { ProductService } from "@services/product-serivce";
import Express from "express";

export class GetAllProductController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    try {
      const service = new ProductService().getAllProducts();
      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
