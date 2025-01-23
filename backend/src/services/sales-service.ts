import { internalError } from "@entities/errors/internalError";
import { ResponseData } from "@entities/response-data";
import { SalesProps } from "@entities/sales";
import { PrismaClient } from "@prisma/client";
import { SalesRepository } from "@repository/sales-repository";
import { ProductService } from "./product-serivce";

export class SalesService implements SalesRepository {
  private sales = new PrismaClient().sales;

  async findSales(month: number): Promise<ResponseData<SalesProps[]>> {
    try {
      const sales = await this.sales.findMany({
        where: { month },
        select: {
          day: true,
          id: true,
          items: true,
          month: true,
          paymentMethod: true,
          value: true
        }
      });

      return {
        msg: "Vendas carregadas com sucesso",
        status: 200,
        data: sales
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async makeSale({
    items,
    paymentMethod
  }: Partial<SalesProps>): Promise<ResponseData<null>> {
    try {
      const month = new Date().getMonth() + 1;
      const products = [];
      let value = 0;

      const verifyIfProductsExist = async (): Promise<boolean[]> => {
        const checks = items.map(async product => {
          const existingProduct = await new ProductService().findProduct(
            product.productId
          );
          products.push({ product: existingProduct.data, unit: product.unit });
          return existingProduct.data !== null;
        });

        return await Promise.all(checks);
      };

      const exists = await verifyIfProductsExist();
      if (exists.includes(false)) {
        return {
          msg: "Produto não encontrado",
          status: 404,
          data: null
        };
      }

      products.map(product => {
        value += product.product.value * product.unit;
      });

      await this.sales.create({
        data: {
          items: {
            createMany: {
              data: products.map(product => ({
                productId: product.product.id,
                unit: product.unit
              }))
            }
          },
          paymentMethod,
          month,
          value
        }
      });

      return {
        msg: "Venda feita com sucesso!",
        status: 200,
        data: null
      };
    } catch (e) {
      console.log(e);

      return internalError(e);
    }
  }
}
