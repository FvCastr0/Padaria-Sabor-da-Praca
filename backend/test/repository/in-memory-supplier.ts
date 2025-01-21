import { AlreadyExist } from "@entities/errors/already-exist";
import { ResponseData } from "@entities/response-data";
import { Supplier, SupplierProps } from "@entities/supplier";
import { SupplierRepository } from "@repository/supplier-repository";
import { makeSupplier } from "@test/factory-functions/makeSupplier";

export class InMemorySupplierRepository implements SupplierRepository {
  suppliers: Supplier[] = [];

  async getAllSuppliers(): Promise<ResponseData<SupplierProps[]>> {
    return {
      msg: "Funcionários carregados",
      status: 200,
      data: this.suppliers
    };
  }
  async addSupplier({
    name,
    contact
  }: SupplierProps): Promise<ResponseData<null>> {
    const supplier = this.suppliers.find(supplier => supplier.name === name);

    if (supplier) throw new AlreadyExist("Esse fornecedor");

    this.suppliers.push(
      makeSupplier({
        name,
        contact
      })
    );
    return {
      msg: "Fornecedor adicionado com sucesso",
      status: 200,
      data: null
    };
  }

  async findSupplier(name: string): Promise<ResponseData<SupplierProps>> {
    const supplier = this.suppliers.find(supplier => supplier.name === name);
    return {
      msg: "Funcionário carregado!",
      status: 200,
      data: supplier
    };
  }

  async removeSupplier(id: number): Promise<ResponseData<null>> {
    const supplierIndex = this.suppliers.findIndex(
      supplier => supplier.id === id
    );

    this.suppliers.splice(supplierIndex, 1);
    return {
      msg: "Funcionário removido com sucesso",
      status: 200,
      data: null
    };
  }
}
