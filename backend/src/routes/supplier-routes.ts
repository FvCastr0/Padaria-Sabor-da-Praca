import { AddSupplierController } from "@controllers/supplier/add-supplier-controller";
import Express, { Router } from "express";

const router = Router();

router.post("/new", async (req: Express.Request, res: Express.Response) => {
  await new AddSupplierController().execute(req, res);
});

export default router;
