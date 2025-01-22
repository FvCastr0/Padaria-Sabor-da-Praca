import { SupplierProps } from "./supplier";

export interface RawMaterialProps {
  id?: number;
  name: string;
  value: number;
  stock: number;
  min_stock: number;
  supplier: SupplierProps;
}
