import { FindSalesMonthController } from "@controllers/sales/find-sales-month-controller";
import { MakeSaleController } from "@controllers/sales/make-sale-controller";
import Express, { Router } from "express";

const router = Router();

router.get("/:id", async (req: Express.Request, res: Express.Response) => {
  await new FindSalesMonthController().execute(req, res);
});

router.post("/new", async (req: Express.Request, res: Express.Response) => {
  await new MakeSaleController().execute(req, res);
});

export default router;
