class BaseService {
  constructor(model) {
    /**
     * @type {import('mongoose').Model}
     */
    this.model = model;
  }

  async findAll(query = {}) {
    const result = await this.model.find(query);
    return result;
  }

  async findOne(query = {}) {
    const result = await this.model.findOne(query);
    return result;
  }

  async findById(id) {
    const result = await this.model.findById(id);
    return result;
  }

  async create(data) {
    const result = await this.model.create(data);
    return result;
  }

  async updateById(id, data) {
    const result = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return result;
  }

  async deleteById(id) {
    const result = await this.model.findByIdAndDelete(id);
    return result;
  }

  async deleteMany(query={}){
    const result = await this.model.deleteMany(query);
    return result;
  }
}

module.exports = BaseService;
