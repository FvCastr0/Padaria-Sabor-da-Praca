import { ProductProps } from "@entities/product";
import { ResponseData } from "@entities/response-data";

export abstract class ProductRepository {
  abstract getAllProducts(): Promise<ResponseData<ProductProps[]>>;
  abstract addProduct({
    name,
    composition,
    value
  }: ProductProps): Promise<ResponseData<null>>;
  abstract findProduct(id: number): Promise<ResponseData<ProductProps>>;
  abstract updateProductValue(
    id: number,
    value: number
  ): Promise<ResponseData<ProductProps>>;
  abstract removeProduct(id: number): Promise<ResponseData<null>>;
}
