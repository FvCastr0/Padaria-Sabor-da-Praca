import { ResponseData } from "@entities/response-data";
import { SupplierProps } from "@entities/supplier";

export abstract class SupplierRepository {
  abstract addSupplier({ name, contact }: SupplierProps): Promise<ResponseData>;
}
