import { serviceTemplate } from "@entities/service-template";
import { RawMaterialService } from "@services/raw-material-service";
import Express from "express";

export class UpdateRawMaterialSupplierController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    const { supplier } = req.body;
    try {
      const service = new RawMaterialService().updateRawMaterialSupplier(
        Number(id),
        supplier
      );
      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
