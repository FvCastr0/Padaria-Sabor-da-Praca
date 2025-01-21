import { SupplierService } from "@services/supplier-service";
import Express from "express";

export class RemoveSupplierController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    try {
      await new SupplierService()
        .removeSupplier(Number(id))
        .then(req => {
          res.status(req.status).send({ msg: req.msg, data: req.data });
        })
        .catch(e => {
          res.status(400).send({ msg: "Something went wrong", data: e });
        });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
