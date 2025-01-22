import { RawMaterialProps } from "@entities/raw-material";
import { ResponseData } from "@entities/response-data";
import { SupplierProps } from "@entities/supplier";

export abstract class RawMaterialRepository {
  abstract getStock(): Promise<ResponseData<RawMaterialProps[]>>;
  abstract findRawMaterial(id: number): Promise<ResponseData<RawMaterialProps>>;
  abstract addRawMaterial({
    name,
    stock,
    min_stock,
    value,
    supplier
  }: RawMaterialProps): Promise<ResponseData<null>>;

  abstract addRawMaterialStock(
    id: number,
    stock: number
  ): Promise<ResponseData<null>>;
  abstract removeRawMaterial(id: number): Promise<ResponseData<null>>;
  abstract updateRawMaterialValue(
    id: number,
    value: number
  ): Promise<ResponseData<null>>;
  abstract updateRawMaterialSupplier(
    id: number,
    supplier: SupplierProps
  ): Promise<ResponseData<null>>;
}
