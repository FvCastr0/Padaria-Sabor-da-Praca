import { AddProductController } from "@controllers/product/add-product-controller";
import { FindProductController } from "@controllers/product/find-product-controller";
import { GetAllProductController } from "@controllers/product/get-all-products-controller";
import { RemoveProductController } from "@controllers/product/remove-product-controller";
import { UpdateProductValueController } from "@controllers/product/update-product-value-controller";
import Express, { Router } from "express";

const router = Router();

router.get("/", async (req: Express.Request, res: Express.Response) => {
  await new GetAllProductController().execute(req, res);
});

router.get("/find/:id", async (req: Express.Request, res: Express.Response) => {
  await new FindProductController().execute(req, res);
});

router.post("/new", async (req: Express.Request, res: Express.Response) => {
  await new AddProductController().execute(req, res);
});

router.patch(
  "/update/:id",
  async (req: Express.Request, res: Express.Response) => {
    await new UpdateProductValueController().execute(req, res);
  }
);

router.delete(
  "/delete/:id",
  async (req: Express.Request, res: Express.Response) => {
    await new RemoveProductController().execute(req, res);
  }
);

export default router;
