import { MakeSaleController } from "@controllers/sales/make-sale-controller";
import Express, { Router } from "express";

const router = Router();

router.post("/new", async (req: Express.Request, res: Express.Response) => {
  await new MakeSaleController().execute(req, res);
});

export default router;
