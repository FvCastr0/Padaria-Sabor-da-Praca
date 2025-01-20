import { Supplier, SupplierProps } from "@entities/supplier";

type Overide = Partial<SupplierProps>;

export function makeSupplier(overide: Overide = {}) {
  return new Supplier({
    name: "VPJ",
    contact: "asdas@gmail.com",
    ...overide
  });
}
