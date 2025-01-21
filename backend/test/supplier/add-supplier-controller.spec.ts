import { InMemorySupplierRepository } from "@test/repository/in-memory-supplier";

describe("Add supplier", () => {
  it("should be able to add a supplier", async () => {
    const name = "Supplier 1";
    const contact = "1234567890";

    const controller = await new InMemorySupplierRepository().addSupplier({
      name,
      contact
    });

    expect(controller.msg).toBe("Fornecedor adicionado com sucesso");
    expect(controller.status).toEqual(200);
  });
});
