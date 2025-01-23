import { ProductProps } from "@entities/product";
import { serviceTemplate } from "@entities/service-template";
import { ProductService } from "@services/product-serivce";
import Express from "express";

export class AddProductController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { name, value, composition, id } = req.body as ProductProps;

    if (name.length <= 0 || value <= 0) {
      res.status(400).send({ msg: "Você não deve deixar nenhum campo vazio." });
      return;
    }

    try {
      const service = new ProductService().addProduct({
        name,
        value,
        composition,
        id
      });

      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
