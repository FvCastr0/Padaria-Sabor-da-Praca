import { internalError } from "@entities/errors/internalError";
import { ProductProps } from "@entities/product";
import { ResponseData } from "@entities/response-data";
import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "@repository/product-repository";
import { RawMaterialService } from "./raw-material-service";

export class ProductService implements ProductRepository {
  private product = new PrismaClient().product;
  private selectProductProps = {
    id: true,
    name: true,
    value: true,
    composition: {
      select: {
        quantity: true,
        rawMaterialId: true
      }
    }
  };

  async getAllProducts(): Promise<ResponseData<ProductProps[]>> {
    try {
      const products = await this.product.findMany({
        select: { ...this.selectProductProps }
      });

      return {
        msg: "Produtos carregados com sucesso",
        status: 200,
        data: products
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async findProduct(id: number): Promise<ResponseData<ProductProps>> {
    try {
      const product = await this.product.findFirst({
        where: { id },
        select: { ...this.selectProductProps }
      });

      if (!product)
        return {
          msg: "Produto não encontrado!",
          status: 404,
          data: null
        };

      return {
        msg: "Produto carregado com sucesso",
        status: 200,
        data: product
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async addProduct({
    name,
    value,
    composition
  }: ProductProps): Promise<ResponseData<null>> {
    try {
      const existingProduct = await this.product.findUnique({
        where: { name }
      });

      if (existingProduct)
        return {
          msg: "Esse produto já existe",
          status: 400,
          data: null
        };

      const verifyIfRawMaterialExist = async (): Promise<boolean[]> => {
        const checks = composition.map(async rawMaterial => {
          const existingRawMaterial =
            await new RawMaterialService().findRawMaterial(
              rawMaterial.rawMaterialId
            );
          return existingRawMaterial.data !== null;
        });
        return await Promise.all(checks);
      };

      const exists = await verifyIfRawMaterialExist();
      if (exists.includes(false)) {
        return {
          msg: "Matéria-prima não existente",
          status: 404,
          data: null
        };
      }

      await this.product.create({
        data: {
          name,
          value,
          composition: {
            createMany: {
              data: composition
            }
          }
        }
      });

      return {
        msg: "Produto criado com sucesso",
        status: 201,
        data: null
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async removeProduct(id: number): Promise<ResponseData<null>> {
    try {
      const product = await this.product.findFirst({ where: { id } });
      if (!product)
        return {
          msg: "Produto não encontrado!",
          status: 404,
          data: null
        };

      await new PrismaClient().composition.deleteMany({
        where: {
          productId: id
        }
      });

      await this.product.delete({
        where: {
          id
        }
      });

      return {
        msg: "Produto deletado com sucesso",
        status: 200,
        data: null
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async updateProductValue(
    id: number,
    value: number
  ): Promise<ResponseData<ProductProps>> {
    try {
      const product = await this.product.findFirst({
        where: { id },
        select: { ...this.selectProductProps }
      });

      if (!product)
        return {
          msg: "Produto não encontrado!",
          status: 404,
          data: null
        };

      await this.product.update({
        where: { id },
        data: { value }
      });

      return {
        msg: "Produto carregado com sucesso",
        status: 200,
        data: product
      };
    } catch (e) {
      return internalError(e);
    }
  }
}
