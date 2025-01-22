import { serviceTemplate } from "@entities/service-template";
import { RawMaterialService } from "@services/raw-material-service";
import Express from "express";

export class FindRawMaterialController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    try {
      const service = new RawMaterialService().findRawMaterial(Number(id));
      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
