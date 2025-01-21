import { serviceTemplate } from "@entities/service-template";
import { SupplierService } from "@services/supplier-service";
import Express from "express";

export class UpdateSupplierContactController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    const { contact } = req.body;
    try {
      if (contact.length < 5) {
        res.status(406).send({
          msg: "O contato deve ter no mínimo 6 carácteres.",
          data: null
        });
      }

      const service = new SupplierService().updateSupplierContact(
        Number(id),
        contact
      );
      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
