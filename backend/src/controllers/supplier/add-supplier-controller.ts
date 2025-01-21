import { serviceTemplate } from "@entities/service-template";
import { SupplierProps } from "@entities/supplier";
import { SupplierService } from "@services/supplier-service";
import Express from "express";

export class AddSupplierController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { name, contact, id } = req.body as SupplierProps;

    try {
      if (name.length <= 0 && contact.length <= 0) {
        res.status(401).send("Você não deve deixar nenhum campo vazio.");
        return;
      }

      const service = new SupplierService().addSupplier({
        name,
        contact,
        id
      });

      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
