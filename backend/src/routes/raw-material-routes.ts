import { AddRawMaterial } from "@controllers/raw-material/add-raw-material-controller";
import { AddRawMaterialStockController } from "@controllers/raw-material/add-raw-material-stock-controller";
import { FindRawMaterialController } from "@controllers/raw-material/find-raw-material-controller";
import { GetStockController } from "@controllers/raw-material/get-stock-controller";
import { RemoveRawMaterialController } from "@controllers/raw-material/remove-raw-material-controller";
import { UpdateRawMaterialSupplierController } from "@controllers/raw-material/update-raw-material-supplier-controller";
import { UpdateRawMaterialValueController } from "@controllers/raw-material/update-raw-material-value-controller";
import Express, { Router } from "express";

const router = Router();

router.get("/", async (req: Express.Request, res: Express.Response) => {
  await new GetStockController().execute(req, res);
});

router.get("/find/:id", async (req: Express.Request, res: Express.Response) => {
  await new FindRawMaterialController().execute(req, res);
});

router.post("/new", async (req: Express.Request, res: Express.Response) => {
  await new AddRawMaterial().execute(req, res);
});

router.post(
  "/add/stock/:id",
  async (req: Express.Request, res: Express.Response) => {
    await new AddRawMaterialStockController().execute(req, res);
  }
);

router.patch(
  "/update/value/:id",
  async (req: Express.Request, res: Express.Response) => {
    await new UpdateRawMaterialValueController().execute(req, res);
  }
);

router.patch(
  "/update/supplier/:id",
  async (req: Express.Request, res: Express.Response) => {
    await new UpdateRawMaterialSupplierController().execute(req, res);
  }
);

router.delete(
  "/delete/:id",
  async (req: Express.Request, res: Express.Response) => {
    await new RemoveRawMaterialController().execute(req, res);
  }
);

export default router;
