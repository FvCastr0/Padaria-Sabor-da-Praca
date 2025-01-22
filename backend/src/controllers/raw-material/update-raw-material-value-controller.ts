import { serviceTemplate } from "@entities/service-template";
import { RawMaterialService } from "@services/raw-material-service";
import Express from "express";

export class UpdateRawMaterialValueController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    const { value } = req.body;
    try {
      if (typeof value !== "number") {
        res.status(400).send({
          msg: "Você deve colocar um número.",
          data: null
        });
        return;
      }

      if (value <= 0) {
        res.status(406).send({
          msg: "Você deve colocar um valor maior que zero.",
          data: null
        });
        return;
      }

      const service = new RawMaterialService().updateRawMaterialValue(
        Number(id),
        value
      );
      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
