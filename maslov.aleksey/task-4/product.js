class Product {
  #id;
  #name;
  #suppliers;

  constructor(id, name, suppliers = []) {
    this.#id = id;
    this.#name = name;
    this.#suppliers = [...suppliers];
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get suppliers() {
    return [...this.#suppliers];
  }
  get supplierCount() {
    return this.#suppliers.length;
  }

  addSupplier(name) {
    if (!name) {
      throw new Error("Name cannot be empty");
    }
    if (this.#suppliers.includes(name)) {
      throw new Error(`"${name}" already added`);
    }
    this.#suppliers.push(name);
  }

  removeSupplier(name) {
    const index = this.#suppliers.indexOf(name);
    if (index === -1) {
      throw new Error(`"${name}" not found`);
    }
    this.#suppliers.splice(index, 1);
  }

  toJSON() {
    return {id: this.#id, name: this.#name, suppliers: this.#suppliers};
  }
}
