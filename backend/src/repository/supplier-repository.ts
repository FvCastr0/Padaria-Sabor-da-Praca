import { ResponseData } from "@entities/response-data";
import { SupplierProps } from "@entities/supplier";

export abstract class SupplierRepository {
  abstract addSupplier({
    name,
    contact
  }: SupplierProps): Promise<ResponseData<null>>;
  abstract getAllSuppliers(): Promise<ResponseData<SupplierProps[]>>;
  abstract findSupplier(name: string): Promise<ResponseData<SupplierProps>>;
  abstract removeSupplier(id: number): Promise<ResponseData<null>>;
}
