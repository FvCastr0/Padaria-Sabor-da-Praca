import { ResponseData } from "@entities/response-data";
import { SupplierProps } from "@entities/supplier";
import { PrismaClient } from "@prisma/client";
import { SupplierRepository } from "@repository/supplier-repository";
import { internalError } from "@test/factory-functions/internalError";

export class SupplierService implements SupplierRepository {
  private supplier = new PrismaClient().supplier;

  async getAllSuppliers(): Promise<ResponseData<SupplierProps[]>> {
    try {
      const suppliers = await this.supplier.findMany();
      return {
        msg: "Todos os fornecedores foram carregados",
        status: 200,
        data: suppliers
      };
    } catch (e) {
      return internalError();
    }
  }

  async addSupplier({
    name,
    contact
  }: SupplierProps): Promise<ResponseData<null>> {
    try {
      await this.supplier.create({
        data: {
          name,
          contact
        }
      });

      return {
        msg: "Fornecedor criado com sucesso",
        status: 201,
        data: null
      };
    } catch (e) {
      return internalError();
    }
  }

  findSupplier(name: string): Promise<ResponseData<SupplierProps>> {
    throw new Error("Method not implemented.");
  }

  removeSupplier(id: number): Promise<ResponseData<null>> {
    throw new Error("Method not implemented.");
  }
}
