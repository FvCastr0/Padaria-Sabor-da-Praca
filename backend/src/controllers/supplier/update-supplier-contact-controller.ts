import { SupplierService } from "@services/supplier-service";
import Express from "express";

export class UpdateSupplierContactController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { id } = req.params;
    const { contact } = req.body;
    try {
      if (contact.length < 5) {
        res
          .status(406)
          .send({
            msg: "O contato deve ter no mínimo 6 carácteres.",
            data: null
          });
      }

      await new SupplierService()
        .updateSupplierContact(Number(id), contact)
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
