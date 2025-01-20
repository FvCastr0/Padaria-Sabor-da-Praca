import { Supplier } from "@entities/supplier";
import { makeSupplier } from "@test/factory-functions/makeSupplier";

describe("Supplier", () => {
  it("should be able to create a supplier", () => {
    const supplier = new Supplier(makeSupplier());

    expect(supplier).toBeTruthy();
  });
});
