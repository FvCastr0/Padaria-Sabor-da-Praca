import { ResponseData } from "@entities/response-data";
import { SupplierProps } from "@entities/supplier";
import { PrismaClient } from "@prisma/client";
import { SupplierRepository } from "@repository/supplier-repository";

export class SupplierService implements SupplierRepository {
  async addSupplier({ name, contact }: SupplierProps): Promise<ResponseData> {
    const supplier = new PrismaClient().supplier;

    try {
      await supplier.create({
        data: {
          name,
          contact
        }
      });

      return {
        msg: "Supplier created succefully",
        status: 200,
        data: {}
      };
    } catch (e) {
      console.log(e);

      return {
        msg: "Internal server error.",
        status: 500,
        data: { e }
      };
    }
  }
}
