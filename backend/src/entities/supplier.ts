export interface SupplierProps {
  name: string;
  contact: string;
}

export class Supplier {
  private _id: number;
  private _name: string;
  private _contact: string;
  private _createdAt: Date;

  constructor({ name, contact }: SupplierProps) {
    this._name = name;
    this._contact = contact;
    this._createdAt = new Date();
  }

  public get id() {
    return this._id;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get name() {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  public get contact() {
    return this._contact;
  }
  public set contact(contact: string) {
    this._contact = contact;
  }
}
