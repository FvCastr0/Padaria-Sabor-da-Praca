import { SalesProps } from "@entities/sales";
import { serviceTemplate } from "@entities/service-template";
import { paymentMethods } from "@prisma/client";
import { SalesService } from "@services/sales-service";
import Express from "express";

export class MakeSaleController {
  static execute: any;
  async execute(req: Express.Request, res: Express.Response) {
    const { paymentMethod, items } = req.body as SalesProps;

    if (items.length <= 0) {
      res
        .status(400)
        .send({ msg: "Você deve adicionar itens para fazer uma venda." });
      return;
    }

    try {
      let service;

      switch (paymentMethod) {
        case paymentMethods.DINHEIRO:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        case paymentMethods.PIX:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        case paymentMethods.CREDITO_MASTERCARD:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        case paymentMethods.CREDITO_VISA:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        case paymentMethods.CREDITO_ELO:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        case paymentMethods.DEBITO_MASTERCARD:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        case paymentMethods.DEBITO_VISA:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        case paymentMethods.DEBITO_ELO:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        case paymentMethods.VOUCHER:
          service = new SalesService().makeSale({
            paymentMethod,
            items
          });
          break;

        default:
          res.status(400).send({ msg: "Método de pagamento inválido." });
          return;
      }

      await serviceTemplate({ res, service });
    } catch (e) {
      res.status(500).send({ msg: "Internal server errro.", e });
    }
  }
}
