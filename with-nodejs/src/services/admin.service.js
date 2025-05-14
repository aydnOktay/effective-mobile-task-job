const adminModel = require("../models/admin.schema");
const BaseService = require("./base/base.service");

class AdminService extends BaseService {
    constructor() {
        super(adminModel);
    }
}

module.exports = new AdminService();