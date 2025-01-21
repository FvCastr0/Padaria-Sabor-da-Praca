import { AddSupplierController } from "@controllers/supplier/add-supplier-controller";
import { FindSupplierController } from "@controllers/supplier/find-supplier-controller";
import { GetAllSuppliersController } from "@controllers/supplier/get-all-suppliers-controller";
import { RemoveSupplierController } from "@controllers/supplier/remove-supplier-controller";
import { UpdateSupplierContactController } from "@controllers/supplier/update-supplier-contact-controller";
import Express, { Router } from "express";

const router = Router();

router.get("/", async (req: Express.Request, res: Express.Response) => {
  await new GetAllSuppliersController().execute(req, res);
});

router.get("/:name", async (req: Express.Request, res: Express.Response) => {
  await new FindSupplierController().execute(req, res);
});

router.post("/new", async (req: Express.Request, res: Express.Response) => {
  await new AddSupplierController().execute(req, res);
});

router.patch("/:id", async (req: Express.Request, res: Express.Response) => {
  await new UpdateSupplierContactController().execute(req, res);
});

router.delete("/:id", async (req: Express.Request, res: Express.Response) => {
  await new RemoveSupplierController().execute(req, res);
});

export default router;
