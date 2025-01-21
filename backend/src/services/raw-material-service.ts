import { internalError } from "@entities/errors/internalError";
import { RawMaterialProps } from "@entities/raw-material";
import { ResponseData } from "@entities/response-data";
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
    supplier,
    id
  }: RawMaterialProps): Promise<ResponseData<null>> {
    try {
      const existingSupplier = await new SupplierService().findSupplier(
        supplier.name
      );

      const existingRawMaterial = await this.findRawMaterial(id);

      if (existingRawMaterial.status === 200 || existingRawMaterial.data)
        return {
          msg: "Esse item já existe",
          status: 400,
          data: null
        };

      if (existingSupplier.status !== 200 || !existingSupplier.data)
        return {
          msg: "Fornecedor não encontrado!",
          status: 404,
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
    } catch (e) {
      return internalError(e);
    }
  }

  async addRawMaterialStock({
    id,
    stock
  }: RawMaterialProps): Promise<ResponseData<null>> {
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

  async updateRawMaterialValue({
    id,
    value
  }: RawMaterialProps): Promise<ResponseData<null>> {
    try {
      (await this.findRawMaterial(id)).data;

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

  async updateRawMaterialSupplier({
    id,
    supplier
  }: RawMaterialProps): Promise<ResponseData<null>> {
    try {
      await this.findRawMaterial(id);

      await this.rawMaterial.update({
        where: { id },
        data: { supplier: { connect: { id: supplier.id } } }
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

  async removeRawMaterial(id: number): Promise<ResponseData<null>> {
    try {
      await this.findRawMaterial(id);

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
