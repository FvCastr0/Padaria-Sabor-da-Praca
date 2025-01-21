import { internalError } from "@entities/errors/internalError";
import { ResponseData } from "@entities/response-data";
import { SupplierProps } from "@entities/supplier";
import { PrismaClient } from "@prisma/client";
import { SupplierRepository } from "@repository/supplier-repository";

export class SupplierService implements SupplierRepository {
  private supplier = new PrismaClient().supplier;

  async getAllSuppliers(): Promise<ResponseData<SupplierProps[]>> {
    try {
      const suppliers = await this.supplier.findMany({
        select: {
          name: true,
          contact: true,
          id: true,
          raw_material: true
        }
      });
      return {
        msg: "Todos os fornecedores foram carregados",
        status: 200,
        data: suppliers
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async findSupplier(name: string): Promise<ResponseData<SupplierProps>> {
    try {
      const supplier = await this.supplier.findFirst({
        select: {
          name: true,
          id: true,
          contact: true,
          raw_material: true
        },
        where: {
          name
        }
      });

      if (!supplier)
        return {
          msg: "Esse fornecedor não foi encontrado.",
          status: 404,
          data: null
        };

      return {
        msg: "Fornecedor carregado.",
        status: 200,
        data: supplier
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async addSupplier({
    name,
    contact
  }: SupplierProps): Promise<ResponseData<null>> {
    try {
      const findSupplier = await this.findSupplier(name);
      if (findSupplier.status === 200)
        return {
          msg: "Esse fornecedor já existe",
          status: 400,
          data: null
        };

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
      return internalError(e);
    }
  }

  async updateSupplierContact(
    id: number,
    contact: string
  ): Promise<ResponseData<null>> {
    try {
      const supplier = await this.supplier.findFirst({
        where: {
          id
        }
      });

      if (!supplier)
        return {
          msg: "Esse fornecedor não foi encontrado.",
          status: 404,
          data: null
        };

      await this.supplier.update({
        where: {
          id
        },
        data: {
          contact
        }
      });

      return {
        msg: "Contato do fornecedor atualizado.",
        status: 200,
        data: null
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async removeSupplier(id: number): Promise<ResponseData<null>> {
    try {
      const supplier = await this.supplier.findFirst({
        where: {
          id
        },
        select: {
          raw_material: true
        }
      });

      if (!supplier)
        return {
          msg: "Esse fornecedor não foi encontrado.",
          status: 404,
          data: null
        };

      if (supplier.raw_material.length > 0)
        return {
          msg: "Você não deve ter nenhum item no estoque atrelado ao fornecedor",
          status: 400,
          data: null
        };

      await this.supplier.delete({
        where: {
          id
        }
      });

      return {
        msg: "Fornecedor deletado.",
        status: 200,
        data: null
      };
    } catch (e) {
      return internalError(e);
    }
  }
}
