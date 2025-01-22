import { serviceTemplate } from "@entities/service-template";
import { RawMaterialService } from "@services/raw-material-service";
import Express from "express";

export class AddRawMaterialStockController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    const { value }: { value: number } = req.body;
    try {
      if (value < 0) {
        res
          .status(400)
          .send({ msg: "Você deve colocar um valor maior que zero." });
        return;
      }

      const service = new RawMaterialService().addRawMaterialStock(
        Number(id),
        value
      );
      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
