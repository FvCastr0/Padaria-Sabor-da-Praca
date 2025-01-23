import { ResponseData } from "@entities/response-data";
import { SalesProps } from "@entities/sales";

export abstract class SalesRepository {
  abstract findSales(month: number): Promise<ResponseData<SalesProps[]>>;
  abstract makeSale({
    items,
    paymentMethod
  }: SalesProps): Promise<ResponseData<null>>;
}
