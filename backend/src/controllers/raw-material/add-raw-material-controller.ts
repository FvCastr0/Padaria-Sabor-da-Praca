import { RawMaterialProps } from "@entities/raw-material";
import { serviceTemplate } from "@entities/service-template";
import { RawMaterialService } from "@services/raw-material-service";
import Express from "express";

export class AddRawMaterial {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { name, min_stock, stock, supplier, value } =
      req.body as RawMaterialProps;

    try {
      if (
        name.length <= 0 &&
        value <= 0 &&
        stock <= 0 &&
        min_stock <= 0 &&
        supplier.name.length <= 0
      ) {
        res.status(401).send("Você não deve deixar nenhum campo vazio.");
        return;
      }

      const service = new RawMaterialService().addRawMaterial({
        name,
        min_stock,
        stock,
        supplier,
        value
      });

      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
