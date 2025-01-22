import { serviceTemplate } from "@entities/service-template";
import { ProductService } from "@services/product-serivce";
import Express from "express";

export class FindProductController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    try {
      const service = new ProductService().findProduct(Number(id));
      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
