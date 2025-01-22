import { internalError } from "@entities/errors/internalError";
import { RawMaterialProps } from "@entities/raw-material";
import { ResponseData } from "@entities/response-data";
import { SupplierProps } from "@entities/supplier";
import { PrismaClient } from "@prisma/client";
import { RawMaterialRepository } from "@repository/raw-material-repository";
import { SupplierService } from "./supplier-service";

export class RawMaterialService implements RawMaterialRepository {
  private rawMaterial = new PrismaClient().rawMaterial;
  private selectRawMaterialProps = {
    id: true,
    name: true,
    value: true,
    stock: true,
    min_stock: true,
    supplier: true
  };

  async getStock(): Promise<ResponseData<RawMaterialProps[]>> {
    try {
      const getAllRawMaterial = await this.rawMaterial.findMany({
        select: { ...this.selectRawMaterialProps }
      });

      return {
        msg: "Materia prima carregada com sucesso",
        status: 200,
        data: getAllRawMaterial
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async findRawMaterial(id: number): Promise<ResponseData<RawMaterialProps>> {
    try {
      const rawMaterial = await this.rawMaterial.findFirst({
        where: { id },
        select: { ...this.selectRawMaterialProps }
      });

      if (!rawMaterial)
        return {
          msg: "Materia prima não encontrada!",
          status: 404,
          data: null
        };

      if ([rawMaterial].length > 1) throw new Error();

      return {
        msg: "Materia prima carregada com sucesso",
        status: 200,
        data: rawMaterial
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async addRawMaterial({
    name,
    stock,
    min_stock,
    value,
    supplier
  }: RawMaterialProps): Promise<ResponseData<null>> {
    try {
      const existingSupplier = await new SupplierService().findSupplier(
        supplier.name
      );

      if (existingSupplier.status !== 200 || !existingSupplier.data)
        return {
          msg: "Fornecedor não encontrado!",
          status: 404,
          data: null
        };

      const existingRawMaterial = await this.rawMaterial.findFirst({
        where: {
          name
        }
      });

      if (existingRawMaterial)
        return {
          msg: "Esse item já existe",
          status: 400,
          data: null
        };

      await this.rawMaterial.create({
        data: {
          name,
          stock,
          min_stock,
          value,
          supplier: {
            connect: { id: existingSupplier.data.id }
          }
        }
      });
      return {
        msg: "Item criado com sucesso",
        status: 201,
        data: null
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async addRawMaterialStock(
    id: number,
    stock: number
  ): Promise<ResponseData<null>> {
    try {
      const existingItem = (await this.findRawMaterial(id)).data;

      await this.rawMaterial.update({
        where: { id },
        data: { stock: existingItem.stock + stock }
      });

      return {
        msg: "Quantidade do estoque adicionada com sucesso",
        status: 200,
        data: null
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async updateRawMaterialValue(
    id: number,
    value: number
  ): Promise<ResponseData<null>> {
    try {
      const existingRawMaterial = (await this.findRawMaterial(id)).data;

      if (!existingRawMaterial)
        return {
          msg: "Matéria prima não encontrada.",
          status: 404,
          data: null
        };

      await this.rawMaterial.update({
        where: { id },
        data: { value }
      });

      return {
        msg: "Valor da materia prima atualizada com sucesso",
        status: 200,
        data: null
      };
    } catch (e) {
      return internalError(e);
    }
  }

  async updateRawMaterialSupplier(
    id: number,
    supplier: SupplierProps
  ): Promise<ResponseData<null>> {
    try {
      const existingRawMaterial = (await this.findRawMaterial(id)).data;

      if (!existingRawMaterial)
        return {
          msg: "Matéria prima não encontrada.",
          status: 404,
          data: null
        };

      const existingSupplier = (
        await new SupplierService().findSupplier(supplier.name)
      ).data;

      if (!existingSupplier)
        return {
          msg: "Fornecedor não encontrado.",
          status: 404,
          data: null
        };

      await this.rawMaterial.update({
        where: { id },
        data: { supplier: { connect: { id: existingSupplier.id } } }
      });

      return {
        msg: "Fornecedor atualizado com sucesso!",
        status: 200,
        data: null
      };
    } catch (e) {
      console.log(e);

      return internalError(e);
    }
  }

  async removeRawMaterial(id: number): Promise<ResponseData<null>> {
    try {
      const existingItem = await this.findRawMaterial(id);

      if (existingItem.data === null)
        return {
          msg: "Esse item não existe",
          status: 404,
          data: null
        };

      await this.rawMaterial.delete({
        where: { id }
      });

      return {
        msg: "Materia prima removida com sucesso",
        status: 200,
        data: null
      };
    } catch (e) {
      return internalError(e);
    }
  }
}
