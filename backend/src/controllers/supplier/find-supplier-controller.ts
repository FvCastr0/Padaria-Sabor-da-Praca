import { serviceTemplate } from "@entities/service-template";
import { SupplierService } from "@services/supplier-service";
import Express from "express";

export class FindSupplierController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { name } = req.params;
    try {
      const service = new SupplierService().findSupplier(name);
      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
