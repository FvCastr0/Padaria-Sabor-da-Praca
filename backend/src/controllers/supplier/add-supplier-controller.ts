import { Supplier } from "@entities/supplier";
import { SupplierService } from "@services/supplier-service";
import Express from "express";

export class AddSupplierController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { name, contact } = req.body as Supplier;

    try {
      if (name.length <= 0 && contact.length <= 0) {
        res.status(401).send("Você não deve deixar nenhum campo vazio.");
        return;
      }

      await new SupplierService()
        .addSupplier({
          name,
          contact
        })
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
