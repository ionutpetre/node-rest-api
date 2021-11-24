class ResourceService {
  constructor(name) {
    console.log(`Initializing ${name} resource`);
    this.name = name;
    this.items = [];
  }

  generateId() {
    return Date.now().toString();
  }

  addOne(item) {
    console.info(`Add ${this.name}: ${JSON.stringify(item)}`);
    const newItem = { ...item, id: this.generateId() };
    this.items.push(newItem);
    return newItem;
  }

  getAll() {
    console.info(`Get ${this.name}s: ${JSON.stringify(this.items)}`);
    return this.items;
  }

  getOne(id) {
    console.info(`Get ${this.name} by id: ${id}`);
    return this.items.find((item) => item.id === id);
  }

  updateOne(id, item) {
    console.info(`Update ${this.name} by id: ${id}`);
    const itemIndex = this.items.findIndex((item) => item.id === id);
    this.items[itemIndex] = item;
    return item;
  }

  deleteOne(id) {
    console.info(`Delete ${this.name} by id: ${id}`);
    this.items = this.items.filter((item) => item.id !== id);
  }
}

module.exports = ResourceService;
